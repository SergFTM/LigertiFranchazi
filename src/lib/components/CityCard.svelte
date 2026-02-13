<script lang="ts">
	import type { City } from '$lib/types';

	interface Props {
		city: City;
		eventCount?: number;
	}

	let { city, eventCount = 0 }: Props = $props();
</script>

<a
	href="/hub/{city.slug}"
	class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
>
	<!-- 2x2 Photo grid (Instagram preview style) -->
	<div class="grid grid-cols-2 gap-0.5 aspect-square">
		{#each city.ig_previews.slice(0, 4) as img, i}
			<div class="overflow-hidden">
				<img
					src={img}
					alt="{city.name} фото {i + 1}"
					class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					loading="lazy"
				/>
			</div>
		{/each}
	</div>

	<div class="p-4">
		<h3 class="font-display text-lg font-bold text-lavender-900 group-hover:text-brand transition-colors">
			{city.name}
		</h3>
		<p class="text-sm text-lavender-500">
			{city.country} &middot; {eventCount} ивентов
		</p>
	</div>
</a>
