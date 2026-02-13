<script lang="ts">
	import AgendaTimeline from '$lib/components/AgendaTimeline.svelte';
	import LastSpotsBadge from '$lib/components/LastSpotsBadge.svelte';
	import { formatPrice, formatDate, remainingSpots, CATEGORY_LABELS, CATEGORY_EMOJI } from '$lib/types';

	let { data } = $props();

	const event = $derived(data.event);
	const venue = $derived(data.venue);
	const city = $derived(data.city);
	const remaining = $derived(remainingSpots(event));
	const soldOut = $derived(remaining === 0);

	let selectedImage = $state(0);
</script>

<svelte:head>
	<title>{event.title_ru} — Liberty Bureau</title>
	<meta name="description" content={event.description_ru.slice(0, 160)} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<!-- Breadcrumb -->
	<nav class="text-sm text-lavender-400 mb-6">
		<a href="/events" class="hover:text-brand">Ивенты</a>
		<span class="mx-2">/</span>
		<span class="text-lavender-700">{event.title_ru}</span>
	</nav>

	<div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
		<!-- Left: Gallery -->
		<div class="lg:col-span-3 space-y-4">
			<!-- Main image -->
			<div class="relative aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden">
				<img
					src={event.media_gallery[selectedImage]}
					alt={event.title_ru}
					class="w-full h-full object-cover"
				/>
				<!-- Category -->
				<span class="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-lavender-700">
					{CATEGORY_EMOJI[event.category]} {CATEGORY_LABELS[event.category]}
				</span>
			</div>

			<!-- Thumbnails -->
			{#if event.media_gallery.length > 1}
				<div class="flex gap-2 overflow-x-auto">
					{#each event.media_gallery as img, i}
						<button
							class="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors {i === selectedImage
								? 'border-brand'
								: 'border-transparent'}"
							onclick={() => (selectedImage = i)}
						>
							<img src={img} alt="" class="w-full h-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}

			<!-- Description -->
			<div class="prose prose-lavender max-w-none">
				<h2 class="font-display text-xl font-bold text-lavender-900 mb-3">Описание</h2>
				<p class="text-lavender-600 leading-relaxed">{event.description_ru}</p>
			</div>

			<!-- Agenda Timeline -->
			{#if event.agenda.length > 0}
				<div>
					<h2 class="font-display text-xl font-bold text-lavender-900 mb-4">Программа</h2>
					<AgendaTimeline items={event.agenda} />
				</div>
			{/if}
		</div>

		<!-- Right: Booking sidebar -->
		<div class="lg:col-span-2">
			<div class="sticky top-24 space-y-4">
				<!-- Price card -->
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 space-y-4">
					<h1 class="font-display text-2xl font-bold text-lavender-900">{event.title_ru}</h1>

					<div class="space-y-2 text-sm text-lavender-600">
						<div class="flex items-center gap-2">
							<span>📅</span>
							<span>{formatDate(event.start_at)}</span>
						</div>
						<div class="flex items-center gap-2">
							<span>⏱️</span>
							<span>{event.duration_min} минут</span>
						</div>
						{#if venue}
							<div class="flex items-center gap-2">
								<span>📍</span>
								<span>{venue.name}, {city?.name}</span>
							</div>
						{/if}
						<div class="flex items-center gap-2">
							<span>👥</span>
							<span>{remaining} из {event.capacity} мест</span>
						</div>
					</div>

					<div class="border-t border-lavender-100 pt-4">
						<div class="flex items-end justify-between mb-4">
							<div>
								<p class="text-xs text-lavender-400">Стоимость</p>
								<p class="text-3xl font-bold text-brand">{formatPrice(event.price_amount, event.currency)}</p>
							</div>
							<p class="text-xs text-lavender-400">Депозит 50%</p>
						</div>

						<LastSpotsBadge {event} />

						{#if soldOut}
							<button
								disabled
								class="w-full mt-4 px-6 py-3 bg-lavender-200 text-lavender-400 font-semibold rounded-full cursor-not-allowed"
							>
								Мест нет
							</button>
						{:else}
							<a
								href="/booking/{event.id}"
								class="block w-full mt-4 px-6 py-3 bg-brand text-white font-semibold rounded-full text-center hover:bg-lavender-700 transition-colors shadow-lg shadow-brand/25"
							>
								Забронировать
							</a>
						{/if}
					</div>
				</div>

				<!-- Venue info -->
				{#if venue}
					<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
						<h3 class="font-semibold text-lavender-900 mb-2">Место проведения</h3>
						<p class="text-sm text-lavender-600">{venue.name}</p>
						<p class="text-sm text-lavender-400">{venue.address}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
