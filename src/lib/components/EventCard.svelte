<script lang="ts">
	import type { Event } from '$lib/types';
	import { isLastSpots, remainingSpots, formatPrice, formatDate, CATEGORY_LABELS, CATEGORY_EMOJI } from '$lib/types';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();

	const lastSpots = $derived(isLastSpots(event));
	const remaining = $derived(remainingSpots(event));
	const soldOut = $derived(remaining === 0);
</script>

<a
	href="/events/{event.slug}"
	class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
>
	<!-- Image (Instagram-style aspect ratio) -->
	<div class="relative aspect-square overflow-hidden">
		<img
			src={event.cover_image}
			alt={event.title_ru}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
		/>

		<!-- Category badge -->
		<span class="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-lavender-700">
			{CATEGORY_EMOJI[event.category]} {CATEGORY_LABELS[event.category]}
		</span>

		<!-- Last spots / Sold out badge -->
		{#if soldOut}
			<span class="absolute top-3 right-3 px-3 py-1 bg-lavender-900/80 text-white rounded-full text-xs font-medium">
				Sold out
			</span>
		{:else if lastSpots}
			<span class="absolute top-3 right-3 px-3 py-1 bg-accent/90 text-white rounded-full text-xs font-bold animate-pulse">
				Осталось {remaining} мест!
			</span>
		{/if}
	</div>

	<!-- Content -->
	<div class="p-4">
		<h3 class="font-display text-lg font-bold text-lavender-900 mb-1 group-hover:text-brand transition-colors">
			{event.title_ru}
		</h3>

		<p class="text-sm text-lavender-500 mb-3">
			{formatDate(event.start_at)} &middot; {event.duration_min} мин
		</p>

		<div class="flex items-center justify-between">
			<span class="text-lg font-bold text-brand">
				{formatPrice(event.price_amount, event.currency)}
			</span>

			{#if !soldOut}
				<span class="text-xs text-lavender-400">
					{remaining} из {event.capacity} мест
				</span>
			{/if}
		</div>
	</div>
</a>
