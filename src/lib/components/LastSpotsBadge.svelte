<script lang="ts">
	import type { Event } from '$lib/types';
	import { isLastSpots, remainingSpots } from '$lib/types';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();

	const show = $derived(isLastSpots(event));
	const remaining = $derived(remainingSpots(event));
</script>

{#if show}
	<div class="flex items-center gap-2 px-4 py-3 bg-accent/10 border border-accent/30 rounded-xl">
		<span class="text-accent text-lg">🔥</span>
		<div>
			<p class="text-sm font-bold text-accent">Осталось {remaining} мест!</p>
			<p class="text-xs text-lavender-500">Бронируйте скорее</p>
		</div>
	</div>
{/if}
