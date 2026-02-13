<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import CityCard from '$lib/components/CityCard.svelte';
	import PlatformManifest from '$lib/components/PlatformManifest.svelte';
	import { getEventsByCity } from '$lib/data/mock';

	let { data } = $props();
</script>

<svelte:head>
	<title>Liberty Bureau — Творческие ивенты и мастер-классы</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-lavender-100 via-white to-lavender-50">
	<div class="max-w-7xl mx-auto px-4 py-20 md:py-32">
		<div class="max-w-2xl">
			<p class="text-sm font-medium text-brand mb-4 tracking-wider uppercase">Международная сеть</p>
			<h1 class="font-display text-4xl md:text-6xl font-bold text-lavender-900 leading-tight mb-6">
				Творческие
				<span class="text-brand">мастер-классы</span>,
				которые вдохновляют
			</h1>
			<p class="text-lg text-lavender-600 mb-8 leading-relaxed">
				Керамика, парфюмерия, флористика и многое другое.
				Присоединяйтесь к Liberty Bureau в 4 городах мира.
			</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="/events"
					class="px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors shadow-lg shadow-brand/25"
				>
					Смотреть ивенты
				</a>
				<a
					href="/map"
					class="px-8 py-3 bg-white text-brand font-semibold rounded-full border-2 border-brand/20 hover:border-brand transition-colors"
				>
					Карта сети
				</a>
			</div>
		</div>
	</div>

	<!-- Decorative blob -->
	<div class="absolute -top-20 -right-20 w-96 h-96 bg-lavender-200/30 rounded-full blur-3xl"></div>
	<div class="absolute -bottom-20 -left-20 w-72 h-72 bg-lavender-300/20 rounded-full blur-3xl"></div>
</section>

<!-- Categories quick access -->
<section class="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		{#each [
			{ emoji: '🏺', label: 'Керамика', cat: 'pottery' },
			{ emoji: '🌸', label: 'Парфюмерия', cat: 'perfume' },
			{ emoji: '🕯️', label: 'Свечи', cat: 'candles' },
			{ emoji: '💐', label: 'Флористика', cat: 'floristics' }
		] as item}
			<a
				href="/events?category={item.cat}"
				class="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
			>
				<span class="text-2xl">{item.emoji}</span>
				<span class="font-medium text-lavender-700">{item.label}</span>
			</a>
		{/each}
	</div>
</section>

<!-- Upcoming Events -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="flex items-end justify-between mb-8">
		<div>
			<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Ближайшие</p>
			<h2 class="font-display text-3xl font-bold text-lavender-900">Ивенты</h2>
		</div>
		<a href="/events" class="text-sm font-medium text-brand hover:underline">Все ивенты →</a>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each data.events as event}
			<EventCard {event} />
		{/each}
	</div>
</section>

<!-- Cities / Network -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="text-center mb-10">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Наша сеть</p>
		<h2 class="font-display text-3xl font-bold text-lavender-900">Города</h2>
		<p class="text-lavender-500 mt-2">Творческие студии по всему миру</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each data.cities as city}
			<CityCard {city} eventCount={getEventsByCity(city.id).length} />
		{/each}
	</div>
</section>

<!-- Platform Manifest — Digital-first messaging -->
<PlatformManifest />

<!-- CTA Banner -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="bg-gradient-to-r from-brand to-lavender-700 rounded-3xl p-8 md:p-12 text-white text-center">
		<h2 class="font-display text-3xl md:text-4xl font-bold mb-4">Хотите открыть Liberty в своём городе?</h2>
		<p class="text-lavender-200 mb-8 max-w-xl mx-auto">
			Присоединяйтесь к сети и запускайте творческие ивенты под известным брендом
		</p>
		<a
			href="/franchise"
			class="inline-block px-8 py-3 bg-white text-brand font-semibold rounded-full hover:bg-lavender-100 transition-colors"
		>
			Узнать о франшизе
		</a>
	</div>
</section>
