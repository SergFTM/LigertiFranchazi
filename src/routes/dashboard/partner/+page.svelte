<script lang="ts">
	import { formatPrice, formatDate, remainingSpots, CATEGORY_LABELS } from '$lib/types';

	let { data } = $props();
</script>

<svelte:head>
	<title>Кабинет партнёра — Liberty Bureau</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="font-display text-3xl font-bold text-lavender-900">Кабинет партнёра</h1>
			<p class="text-lavender-500">Управление ивентами и бронированиями</p>
		</div>
		<button
			class="px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-full hover:bg-lavender-700 transition-colors"
		>
			+ Новый ивент
		</button>
	</div>

	<!-- Stats -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
		{#each [
			{ label: 'Ивентов', value: data.events.length, icon: '📅' },
			{ label: 'Бронирований', value: data.totalBookings, icon: '🎟️' },
			{ label: 'Выручка', value: formatPrice(data.totalRevenue), icon: '💰' },
			{ label: 'Городов', value: new Set(data.events.map((e) => e.city_id)).size, icon: '🌍' }
		] as stat}
			<div class="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
				<span class="text-2xl">{stat.icon}</span>
				<p class="text-2xl font-bold text-lavender-900 mt-2">{stat.value}</p>
				<p class="text-xs text-lavender-400">{stat.label}</p>
			</div>
		{/each}
	</div>

	<!-- Events table -->
	<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
		<div class="px-6 py-4 border-b border-lavender-100">
			<h2 class="font-semibold text-lavender-900">Мои ивенты</h2>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="bg-lavender-50 text-lavender-500 text-xs uppercase">
					<tr>
						<th class="text-left px-6 py-3 font-medium">Название</th>
						<th class="text-left px-6 py-3 font-medium">Категория</th>
						<th class="text-left px-6 py-3 font-medium">Дата</th>
						<th class="text-left px-6 py-3 font-medium">Места</th>
						<th class="text-left px-6 py-3 font-medium">Брони</th>
						<th class="text-left px-6 py-3 font-medium">Статус</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-lavender-50">
					{#each data.events as event}
						<tr class="hover:bg-lavender-50/50">
							<td class="px-6 py-4">
								<div>
									<p class="font-medium text-lavender-900">{event.title_ru}</p>
									<p class="text-xs text-lavender-400">{event.city?.name}</p>
								</div>
							</td>
							<td class="px-6 py-4 text-lavender-600">{CATEGORY_LABELS[event.category]}</td>
							<td class="px-6 py-4 text-lavender-600">{formatDate(event.start_at)}</td>
							<td class="px-6 py-4">
								<span class="text-lavender-600">{event.booked_count}/{event.capacity}</span>
							</td>
							<td class="px-6 py-4 text-lavender-600">{event.bookingCount}</td>
							<td class="px-6 py-4">
								<span class="px-2.5 py-1 rounded-full text-xs font-medium
									{event.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
									{event.status === 'published' ? 'Опубликован' : event.status}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
