<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Для бизнеса — Liberty Bureau</title>
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-br from-lavender-900 to-brand text-white">
	<div class="max-w-7xl mx-auto px-4 py-20 md:py-28">
		<div class="max-w-2xl">
			<p class="text-sm font-medium text-lavender-200 mb-4 tracking-wider uppercase">B2B</p>
			<h1 class="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
				Корпоративные ивенты от Liberty Bureau
			</h1>
			<p class="text-lg text-lavender-200 leading-relaxed">
				Тимбилдинги, мастер-классы и creative retreat для вашей команды.
				Уникальный формат, который запомнится.
			</p>
		</div>
	</div>
</section>

<!-- Services -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<h2 class="font-display text-3xl font-bold text-lavender-900 mb-10 text-center">Форматы</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each [
			{ icon: '🏢', title: 'Тимбилдинг', desc: 'Творческие мастер-классы для команд от 10 человек. Керамика, парфюмерия, флористика.' },
			{ icon: '🎉', title: 'Корпоратив', desc: 'Полная организация мероприятия: локация, кейтеринг, активности и развлечения.' },
			{ icon: '🌴', title: 'Retreat', desc: 'Выездные программы на 2-3 дня с мастер-классами, wellness и нетворкингом.' }
		] as item}
			<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 text-center">
				<span class="text-4xl mb-4 block">{item.icon}</span>
				<h3 class="font-display text-xl font-bold text-lavender-900 mb-3">{item.title}</h3>
				<p class="text-sm text-lavender-500">{item.desc}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Form -->
<section class="max-w-2xl mx-auto px-4 py-16">
	<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100">
		<h2 class="font-display text-2xl font-bold text-lavender-900 mb-2">Запрос на мероприятие</h2>
		<p class="text-lavender-500 mb-6">Расскажите о вашем мероприятии — мы подготовим предложение</p>

		{#if form?.success}
			<div class="text-center py-8">
				<p class="text-4xl mb-3">✅</p>
				<h3 class="font-display text-xl font-bold text-lavender-900 mb-2">Заявка отправлена!</h3>
				<p class="text-lavender-500">Наш менеджер свяжется с вами в течение 24 часов</p>
			</div>
		{:else}
			{#if form?.error}
				<div class="mb-4 px-4 py-3 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/submit" use:enhance class="space-y-4">
				<div>
					<label for="company" class="block text-sm font-medium text-lavender-700 mb-1">Компания *</label>
					<input
						id="company"
						name="company"
						type="text"
						required
						value={form?.values?.company || ''}
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					/>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label for="contact_name" class="block text-sm font-medium text-lavender-700 mb-1">Контактное лицо *</label>
						<input
							id="contact_name"
							name="contact_name"
							type="text"
							required
							value={form?.values?.contact_name || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-lavender-700 mb-1">Email *</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form?.values?.email || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label for="phone" class="block text-sm font-medium text-lavender-700 mb-1">Телефон *</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							required
							value={form?.values?.phone || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
					<div>
						<label for="guest_count" class="block text-sm font-medium text-lavender-700 mb-1">Кол-во гостей</label>
						<input
							id="guest_count"
							name="guest_count"
							type="number"
							min="1"
							value={form?.values?.guest_count || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
				</div>

				<div>
					<label for="event_type" class="block text-sm font-medium text-lavender-700 mb-1">Тип мероприятия</label>
					<select
						id="event_type"
						name="event_type"
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					>
						<option value="">Выберите тип</option>
						<option value="teambuilding">Тимбилдинг</option>
						<option value="corporate">Корпоратив</option>
						<option value="retreat">Retreat</option>
						<option value="other">Другое</option>
					</select>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-lavender-700 mb-1">Детали</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand resize-none"
						placeholder="Расскажите подробнее о планируемом мероприятии"
					>{form?.values?.message || ''}</textarea>
				</div>

				<button
					type="submit"
					class="w-full px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors"
				>
					Отправить запрос
				</button>
			</form>
		{/if}
	</div>
</section>
