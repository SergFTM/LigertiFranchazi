<script lang="ts">
	import DepositInfo from '$lib/components/DepositInfo.svelte';
	import { formatPrice, formatDate, remainingSpots, calculateDeposit } from '$lib/types';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const event = $derived(data.event);
	const remaining = $derived(remainingSpots(event));

	let step = $state<'qty' | 'contacts' | 'done'>('qty');
	let qty = $state(1);
	let name = $state('');
	let phone = $state('');
	let email = $state('');

	$effect(() => {
		if (form?.success) step = 'done';
		if (form?.values) {
			qty = form.values.qty || 1;
			name = form.values.name || '';
			phone = form.values.phone || '';
			email = form.values.email || '';
		}
	});

	const total = $derived(event.price_amount * qty);
	const deposit = $derived(calculateDeposit(total));
</script>

<svelte:head>
	<title>Бронирование — {event.title_ru}</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	<!-- Breadcrumb -->
	<nav class="text-sm text-lavender-400 mb-6">
		<a href="/events" class="hover:text-brand">Ивенты</a>
		<span class="mx-2">/</span>
		<a href="/events/{event.slug}" class="hover:text-brand">{event.title_ru}</a>
		<span class="mx-2">/</span>
		<span class="text-lavender-700">Бронирование</span>
	</nav>

	<h1 class="font-display text-2xl md:text-3xl font-bold text-lavender-900 mb-2">Бронирование</h1>
	<p class="text-lavender-500 mb-8">{event.title_ru} &middot; {formatDate(event.start_at)}</p>

	<!-- Step indicator -->
	<div class="flex items-center gap-2 mb-8">
		{#each ['Количество', 'Контакты', 'Оплата'] as label, i}
			{@const stepIndex = i}
			{@const active = (step === 'qty' && i === 0) || (step === 'contacts' && i === 1) || (step === 'done' && i === 2)}
			{@const completed = (step === 'contacts' && i === 0) || (step === 'done' && i <= 1)}
			<div class="flex items-center gap-2 {i > 0 ? 'flex-1' : ''}">
				{#if i > 0}
					<div class="flex-1 h-0.5 {completed ? 'bg-brand' : 'bg-lavender-200'}"></div>
				{/if}
				<div class="flex items-center gap-1.5">
					<div
						class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
						{active || completed ? 'bg-brand text-white' : 'bg-lavender-200 text-lavender-400'}"
					>
						{completed ? '✓' : i + 1}
					</div>
					<span class="text-xs font-medium {active ? 'text-brand' : 'text-lavender-400'} hidden sm:inline">{label}</span>
				</div>
			</div>
		{/each}
	</div>

	{#if form?.error}
		<div class="mb-6 px-4 py-3 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">
			{form.error}
		</div>
	{/if}

	<!-- Step 1: Quantity -->
	{#if step === 'qty'}
		<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 space-y-6">
			<h2 class="font-display text-lg font-bold text-lavender-900">Количество мест</h2>

			<div class="flex items-center gap-4">
				<button
					class="w-10 h-10 rounded-full border border-lavender-200 flex items-center justify-center text-lg hover:bg-lavender-50 disabled:opacity-30"
					disabled={qty <= 1}
					onclick={() => (qty = Math.max(1, qty - 1))}
				>
					−
				</button>
				<span class="text-3xl font-bold text-lavender-900 w-12 text-center">{qty}</span>
				<button
					class="w-10 h-10 rounded-full border border-lavender-200 flex items-center justify-center text-lg hover:bg-lavender-50 disabled:opacity-30"
					disabled={qty >= remaining}
					onclick={() => (qty = Math.min(remaining, qty + 1))}
				>
					+
				</button>
			</div>

			<div class="bg-lavender-50 rounded-xl p-4 space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-lavender-500">{formatPrice(event.price_amount, event.currency)} × {qty}</span>
					<span class="font-semibold text-lavender-900">{formatPrice(total, event.currency)}</span>
				</div>
				<div class="flex justify-between border-t border-lavender-200 pt-2">
					<span class="text-lavender-500">Депозит (50%)</span>
					<span class="font-bold text-brand">{formatPrice(deposit, event.currency)}</span>
				</div>
			</div>

			<button
				class="w-full px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors"
				onclick={() => (step = 'contacts')}
			>
				Далее
			</button>
		</div>

	<!-- Step 2: Contacts -->
	{:else if step === 'contacts'}
		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						step = 'done';
					}
					await update();
				};
			}}
			class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 space-y-5"
		>
			<h2 class="font-display text-lg font-bold text-lavender-900">Контактные данные</h2>

			<input type="hidden" name="qty" value={qty} />

			<div>
				<label for="name" class="block text-sm font-medium text-lavender-700 mb-1">Имя</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					bind:value={name}
					class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					placeholder="Ваше имя"
				/>
			</div>

			<div>
				<label for="phone" class="block text-sm font-medium text-lavender-700 mb-1">Телефон</label>
				<input
					id="phone"
					name="phone"
					type="tel"
					required
					bind:value={phone}
					class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					placeholder="+357 99 123456"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-lavender-700 mb-1">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					bind:value={email}
					class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					placeholder="you@example.com"
				/>
			</div>

			<div class="flex gap-3">
				<button
					type="button"
					class="px-6 py-3 border border-lavender-200 text-lavender-600 font-medium rounded-full hover:bg-lavender-50 transition-colors"
					onclick={() => (step = 'qty')}
				>
					Назад
				</button>
				<button
					type="submit"
					class="flex-1 px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors"
				>
					Забронировать
				</button>
			</div>
		</form>

	<!-- Step 3: Done -->
	{:else if step === 'done'}
		<div class="space-y-6">
			<div class="bg-success/10 border border-success/30 rounded-2xl p-6 text-center">
				<p class="text-4xl mb-3">✅</p>
				<h2 class="font-display text-xl font-bold text-lavender-900 mb-2">Бронь создана!</h2>
				<p class="text-sm text-lavender-600">
					{#if form?.booking}
						Номер брони: <span class="font-mono font-bold">{form.booking.id}</span>
					{/if}
				</p>
			</div>

			<DepositInfo depositAmount={deposit} currency={event.currency} />

			<div class="flex gap-3">
				<a
					href="/events"
					class="flex-1 px-6 py-3 border border-lavender-200 text-lavender-600 font-medium rounded-full text-center hover:bg-lavender-50 transition-colors"
				>
					К ивентам
				</a>
				<a
					href="/events/{event.slug}"
					class="flex-1 px-6 py-3 bg-brand text-white font-semibold rounded-full text-center hover:bg-lavender-700 transition-colors"
				>
					К ивенту
				</a>
			</div>
		</div>
	{/if}
</div>
