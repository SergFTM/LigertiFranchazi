<script lang="ts">
	import { formatPrice, formatDate } from '$lib/types';

	let { data } = $props();

	const statusLabels: Record<string, string> = {
		new: 'Новая',
		awaiting_deposit: 'Ожидание депозита',
		confirmed: 'Подтверждена',
		cancelled: 'Отменена'
	};

	const statusColors: Record<string, string> = {
		new: 'bg-blue-100 text-blue-700',
		awaiting_deposit: 'bg-amber-100 text-amber-700',
		confirmed: 'bg-green-100 text-green-700',
		cancelled: 'bg-red-100 text-red-700'
	};
</script>

<svelte:head>
	<title>Мой кабинет — Liberty Bureau</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
	<h1 class="font-display text-3xl font-bold text-lavender-900 mb-2">Мой кабинет</h1>
	<p class="text-lavender-500 mb-8">Управление бронированиями и историей</p>

	<!-- Bookings -->
	<div>
		<h2 class="font-display text-xl font-bold text-lavender-900 mb-4">Мои бронирования</h2>

		{#if data.bookings.length === 0}
			<div class="bg-white rounded-2xl border border-lavender-100 p-10 text-center">
				<p class="text-4xl mb-3">🎟️</p>
				<p class="text-lavender-500 mb-4">У вас пока нет бронирований</p>
				<a
					href="/events"
					class="inline-block px-6 py-2.5 bg-brand text-white text-sm font-medium rounded-full hover:bg-lavender-700 transition-colors"
				>
					Смотреть ивенты
				</a>
			</div>
		{:else}
			<div class="space-y-4">
				{#each data.bookings as booking}
					<div class="bg-white rounded-2xl border border-lavender-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
						{#if booking.event}
							<img
								src={booking.event.cover_image}
								alt=""
								class="w-full sm:w-20 h-20 rounded-xl object-cover shrink-0"
							/>
						{/if}

						<div class="flex-1 min-w-0">
							<h3 class="font-semibold text-lavender-900 truncate">
								{booking.event?.title_ru || 'Ивент'}
							</h3>
							{#if booking.event}
								<p class="text-sm text-lavender-500">{formatDate(booking.event.start_at)}</p>
							{/if}
							<p class="text-xs text-lavender-400 mt-1">
								{booking.qty} мест &middot; Бронь #{booking.id}
							</p>
						</div>

						<div class="flex items-center gap-3">
							<span class="px-3 py-1 rounded-full text-xs font-medium {statusColors[booking.status]}">
								{statusLabels[booking.status]}
							</span>
							<span class="font-bold text-brand">
								{formatPrice(booking.total_amount, booking.event?.currency || 'EUR')}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
