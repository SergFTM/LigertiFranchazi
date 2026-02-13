<script lang="ts">
	import type { AgendaItem } from '$lib/types';

	interface Props {
		items: AgendaItem[];
	}

	let { items }: Props = $props();
</script>

<div class="space-y-0">
	{#each items as item, i}
		<div class="flex gap-4">
			<!-- Timeline line -->
			<div class="flex flex-col items-center">
				<div class="w-3 h-3 rounded-full bg-brand shrink-0 mt-1.5"></div>
				{#if i < items.length - 1}
					<div class="w-0.5 bg-lavender-200 grow min-h-8"></div>
				{/if}
			</div>

			<!-- Content -->
			<div class="pb-6">
				<span class="text-xs font-mono text-lavender-400">{item.time}</span>
				<h4 class="font-semibold text-lavender-900">{item.title}</h4>
				{#if item.description}
					<p class="text-sm text-lavender-500 mt-0.5">{item.description}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>
