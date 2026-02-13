<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	function setFilter(key: string, value: string) {
		const url = new URL(page.url);
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
		goto(url.toString(), { replaceState: true, invalidateAll: true });
	}
</script>

<svelte:head>
	<title>Все ивенты — Liberty Bureau</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Каталог</p>
		<h1 class="font-display text-3xl md:text-4xl font-bold text-lavender-900">Все ивенты</h1>
	</div>

	<!-- Filters -->
	<div class="space-y-4 mb-8">
		<!-- Category filter -->
		<CategoryFilter selected={data.filters.category} onchange={(cat) => setFilter('category', cat)} />

		<!-- City + Search row -->
		<div class="flex flex-col sm:flex-row gap-3">
			<select
				class="px-4 py-2.5 bg-white border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
				onchange={(e) => setFilter('city', e.currentTarget.value)}
				value={data.filters.city}
			>
				<option value="">Все города</option>
				{#each data.cities as city}
					<option value={city.slug}>{city.name}</option>
				{/each}
			</select>

			<input
				type="text"
				placeholder="Поиск..."
				class="px-4 py-2.5 bg-white border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand flex-1"
				value={data.filters.search}
				oninput={(e) => {
					const val = e.currentTarget.value;
					clearTimeout((window as any).__searchTimeout);
					(window as any).__searchTimeout = setTimeout(() => setFilter('search', val), 300);
				}}
			/>
		</div>
	</div>

	<!-- Results -->
	{#if data.events.length === 0}
		<div class="text-center py-20">
			<p class="text-5xl mb-4">🔍</p>
			<h2 class="font-display text-xl font-bold text-lavender-700 mb-2">Ничего не найдено</h2>
			<p class="text-lavender-500">Попробуйте изменить фильтры</p>
		</div>
	{:else}
		<p class="text-sm text-lavender-400 mb-4">Найдено: {data.events.length} ивентов</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.events as event}
				<EventCard {event} />
			{/each}
		</div>
	{/if}
</div>
