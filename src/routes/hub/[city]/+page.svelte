<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';

	let { data } = $props();

	const city = $derived(data.city);
	const events = $derived(data.events);
	const venues = $derived(data.venues);
</script>

<svelte:head>
	<title>Liberty Bureau — {city.name}</title>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden">
	<div class="grid grid-cols-2 md:grid-cols-4 gap-0.5 max-h-64 md:max-h-80">
		{#each city.ig_previews.slice(0, 4) as img, i}
			<div class="overflow-hidden">
				<img src={img} alt="{city.name} {i + 1}" class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>
	<div class="absolute inset-0 bg-gradient-to-t from-lavender-900/60 to-transparent flex items-end">
		<div class="p-6 md:p-10">
			<p class="text-sm text-lavender-200 font-medium mb-1">{city.country}</p>
			<h1 class="font-display text-4xl md:text-5xl font-bold text-white">{city.name}</h1>
		</div>
	</div>
</section>

<div class="max-w-7xl mx-auto px-4 py-10">
	{#if city.description}
		<p class="text-lg text-lavender-600 mb-10 max-w-2xl">{city.description}</p>
	{/if}

	<!-- Venues -->
	{#if venues.length > 0}
		<div class="mb-10">
			<h2 class="font-display text-2xl font-bold text-lavender-900 mb-4">Студии</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{#each venues as venue}
					<div class="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
						<h3 class="font-semibold text-lavender-900">{venue.name}</h3>
						<p class="text-sm text-lavender-500 mt-1">📍 {venue.address}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Events -->
	<div>
		<div class="flex items-end justify-between mb-6">
			<h2 class="font-display text-2xl font-bold text-lavender-900">Ивенты в {city.name}</h2>
			<span class="text-sm text-lavender-400">{events.length} ивентов</span>
		</div>

		{#if events.length === 0}
			<div class="text-center py-16 bg-white rounded-2xl border border-lavender-100">
				<p class="text-4xl mb-3">📅</p>
				<p class="text-lavender-500">Ивенты скоро появятся</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each events as event}
					<EventCard {event} />
				{/each}
			</div>
		{/if}
	</div>
</div>
