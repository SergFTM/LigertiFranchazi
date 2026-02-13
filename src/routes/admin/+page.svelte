<script lang="ts">
	import { formatPrice, formatDate } from '$lib/types';

	let { data } = $props();

	const statusLabels: Record<string, string> = {
		new: 'Новая',
		awaiting_deposit: 'Ожидание депозита',
		confirmed: 'Подтверждена',
		cancelled: 'Отменена'
	};
</script>

<svelte:head>
	<title>Админка HQ — Liberty Bureau</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<h1 class="font-display text-3xl font-bold text-lavender-900 mb-2">HQ Админка</h1>
	<p class="text-lavender-500 mb-8">Управление сетью Liberty Bureau</p>

	<!-- Global stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
		{#each [
			{ label: 'Городов', value: data.stats.totalCities, icon: '🌍' },
			{ label: 'Студий', value: data.stats.totalVenues, icon: '🏠' },
			{ label: 'Всего ивентов', value: data.stats.totalEvents, icon: '📅' },
			{ label: 'Активных', value: data.stats.publishedEvents, icon: '✅' },
			{ label: 'Бронирований', value: data.stats.totalBookings, icon: '🎟️' },
			{ label: 'Выручка', value: formatPrice(data.stats.totalRevenue), icon: '💰' },
			{ label: 'Депозиты', value: formatPrice(data.stats.totalDeposits), icon: '🏦' }
		] as stat}
			<div class="bg-white rounded-2xl p-4 shadow-sm border border-lavender-100 text-center">
				<span class="text-xl">{stat.icon}</span>
				<p class="text-lg font-bold text-lavender-900 mt-1">{stat.value}</p>
				<p class="text-xs text-lavender-400">{stat.label}</p>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
		<!-- Cities overview -->
		<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
			<div class="px-6 py-4 border-b border-lavender-100">
				<h2 class="font-semibold text-lavender-900">Города сети</h2>
			</div>
			<div class="divide-y divide-lavender-50">
				{#each data.cities as city}
					<div class="px-6 py-4 flex items-center justify-between">
						<div>
							<p class="font-medium text-lavender-900">{city.name}</p>
							<p class="text-xs text-lavender-400">{city.country}</p>
						</div>
						<div class="text-right text-sm">
							<p class="text-lavender-600">{city.eventCount} ивентов</p>
							<p class="text-lavender-400">{city.bookingCount} броней</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Recent bookings -->
		<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
			<div class="px-6 py-4 border-b border-lavender-100">
				<h2 class="font-semibold text-lavender-900">Последние бронирования</h2>
			</div>
			{#if data.recentBookings.length === 0}
				<div class="px-6 py-10 text-center text-lavender-400">Пока нет бронирований</div>
			{:else}
				<div class="divide-y divide-lavender-50">
					{#each data.recentBookings as booking}
						<div class="px-6 py-4">
							<div class="flex items-center justify-between mb-1">
								<p class="font-medium text-lavender-900 text-sm">
									{booking.contact_info.name}
								</p>
								<span class="text-xs text-lavender-400">
									{statusLabels[booking.status]}
								</span>
							</div>
							<p class="text-xs text-lavender-500">
								{booking.event?.title_ru} &middot; {booking.qty} мест &middot;
								{formatPrice(booking.total_amount, booking.event?.currency || 'EUR')}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
