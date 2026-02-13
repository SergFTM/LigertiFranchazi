<script lang="ts">
	import { CATEGORY_LABELS, CATEGORY_EMOJI, type EventCategory } from '$lib/types';

	interface Props {
		selected: string;
		onchange: (category: string) => void;
	}

	let { selected, onchange }: Props = $props();

	const categories = Object.entries(CATEGORY_LABELS) as [EventCategory, string][];
</script>

<div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
	<button
		class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors {selected === ''
			? 'bg-brand text-white'
			: 'bg-white text-lavender-600 hover:bg-lavender-100'}"
		onclick={() => onchange('')}
	>
		Все
	</button>

	{#each categories as [key, label]}
		<button
			class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors {selected === key
				? 'bg-brand text-white'
				: 'bg-white text-lavender-600 hover:bg-lavender-100'}"
			onclick={() => onchange(key)}
		>
			{CATEGORY_EMOJI[key]} {label}
		</button>
	{/each}
</div>
