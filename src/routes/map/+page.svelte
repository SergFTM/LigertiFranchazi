<script lang="ts">
	let { data } = $props();

	let selectedCity = $state<string | null>(null);

	const selected = $derived(data.cities.find((c) => c.id === selectedCity));
</script>

<svelte:head>
	<title>Карта сети — Liberty Bureau</title>
</svelte:head>

<div class="min-h-[calc(100vh-4rem)] bg-lavender-50 flex flex-col">
	<!-- Header -->
	<div class="max-w-7xl mx-auto px-4 py-6 w-full">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Наша сеть</p>
		<h1 class="font-display text-3xl font-bold text-lavender-900">Карта Liberty Bureau</h1>
	</div>

	<!-- Map Area -->
	<div class="flex-1 max-w-7xl mx-auto px-4 pb-8 w-full">
		<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden h-full min-h-[500px] relative">
			<!-- Simplified SVG Map -->
			<div class="w-full h-full flex items-center justify-center p-8">
				<div class="relative w-full max-w-4xl">
					<!-- World map placeholder with dots -->
					<svg viewBox="0 0 800 400" class="w-full h-auto">
						<!-- Background -->
						<rect width="800" height="400" fill="#faf5ff" rx="16" />

						<!-- Grid lines -->
						{#each Array(8) as _, i}
							<line x1={i * 100 + 100} y1="0" x2={i * 100 + 100} y2="400" stroke="#e9d5ff" stroke-width="0.5" />
						{/each}
						{#each Array(4) as _, i}
							<line x1="0" y1={i * 100 + 100} x2="800" y2={i * 100 + 100} stroke="#e9d5ff" stroke-width="0.5" />
						{/each}

						<!-- Connection lines between cities -->
						<line x1="350" y1="200" x2="340" y2="210" stroke="#d8b4fe" stroke-width="1.5" stroke-dasharray="4" />
						<line x1="350" y1="200" x2="500" y2="220" stroke="#d8b4fe" stroke-width="1.5" stroke-dasharray="4" />
						<line x1="350" y1="200" x2="380" y2="170" stroke="#d8b4fe" stroke-width="1.5" stroke-dasharray="4" />

						<!-- City dots -->
						{#each data.cities as city, i}
							{@const positions = [
								{ x: 350, y: 200 },
								{ x: 340, y: 210 },
								{ x: 500, y: 220 },
								{ x: 380, y: 170 }
							]}
							{@const pos = positions[i]}
							<g
								role="button"
								tabindex="0"
								class="cursor-pointer"
								onclick={() => (selectedCity = selectedCity === city.id ? null : city.id)}
								onkeydown={(e) => e.key === 'Enter' && (selectedCity = selectedCity === city.id ? null : city.id)}
							>
								<!-- Pulse ring -->
								<circle
									cx={pos.x}
									cy={pos.y}
									r="20"
									fill="none"
									stroke="#9333ea"
									stroke-width="1"
									opacity="0.3"
								>
									<animate attributeName="r" from="12" to="25" dur="2s" repeatCount="indefinite" />
									<animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
								</circle>

								<!-- Main dot -->
								<circle
									cx={pos.x}
									cy={pos.y}
									r="8"
									fill={selectedCity === city.id ? '#7e22ce' : '#9333ea'}
									stroke="white"
									stroke-width="3"
								/>

								<!-- Label -->
								<text
									x={pos.x}
									y={pos.y - 16}
									text-anchor="middle"
									fill="#581c87"
									font-size="12"
									font-weight="600"
									font-family="Inter, sans-serif"
								>
									{city.name}
								</text>
							</g>
						{/each}
					</svg>
				</div>
			</div>

			<!-- City popup -->
			{#if selected}
				<div class="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-xl border border-lavender-100 overflow-hidden">
					<!-- 2x2 grid -->
					<div class="grid grid-cols-2 gap-0.5 aspect-[2/1]">
						{#each selected.ig_previews.slice(0, 4) as img, i}
							<img src={img} alt="" class="w-full h-full object-cover" />
						{/each}
					</div>
					<div class="p-4">
						<h3 class="font-display text-lg font-bold text-lavender-900">{selected.name}</h3>
						<p class="text-sm text-lavender-500 mb-3">{selected.country} &middot; {selected.eventCount} ивентов</p>
						{#if selected.description}
							<p class="text-sm text-lavender-600 mb-3">{selected.description}</p>
						{/if}
						<a
							href="/hub/{selected.slug}"
							class="block w-full px-4 py-2 bg-brand text-white text-sm font-medium rounded-full text-center hover:bg-lavender-700 transition-colors"
						>
							Перейти в хаб
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- City cards (mobile) -->
	<div class="md:hidden max-w-7xl mx-auto px-4 pb-8 w-full">
		<div class="grid grid-cols-2 gap-3">
			{#each data.cities as city}
				<a
					href="/hub/{city.slug}"
					class="bg-white rounded-xl p-4 shadow-sm border border-lavender-100 text-center"
				>
					<p class="font-semibold text-lavender-900">{city.name}</p>
					<p class="text-xs text-lavender-500">{city.eventCount} ивентов</p>
				</a>
			{/each}
		</div>
	</div>
</div>
