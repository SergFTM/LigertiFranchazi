<script lang="ts">
	let expandedFeature = $state<number | null>(null);

	const features = [
		{
			icon: '📱',
			tag: 'Instagram-Native',
			title: 'Интерфейс, который продолжает Instagram',
			short: 'Карточки ивентов как посты в ленте. Привычные паттерны — без разрыва между соцсетью и платформой.',
			details: 'Дизайн имитирует логику Instagram: крупные фото 1:1, минимум текста, бесконечная лента. Вы не чувствуете, что перешли на «другой сайт» — это продолжение вашего визуального опыта.'
		},
		{
			icon: '🎬',
			tag: 'Agenda',
			title: 'Карточка ивента, которая заменяет 20 сообщений',
			short: 'Таймлайн, карта, «что включено» — всё в одном экране. Без вопросов в Direct.',
			details: 'Визуальная программа по этапам, интерактивная карта с маршрутом и чёткий список «что включено». Вся информация, которую вы обычно выясняете за 20 сообщений — здесь в одном касании.'
		},
		{
			icon: '💜',
			tag: 'AI',
			title: 'Лавандик отвечает вместо менеджера',
			short: 'Мгновенные ответы 24/7. «Можно без опыта?» — спросите, не стесняясь.',
			details: 'AI-ассистент снимает тревожность новичков и отвечает моментально в любое время суток. Вопросы, которые стесняешься задать человеку, легко задать AI. Критически важно для импульсивных решений.'
		},
		{
			icon: '🔒',
			tag: 'Прозрачность',
			title: 'Статусы вместо хаоса в переписке',
			short: 'Депозит → Подтверждение → Билет. Чувство контроля на каждом шаге.',
			details: 'Прозрачный путь: внесли депозит 50% → получили подтверждение → билет в личном кабинете. Никаких «скиньте скрин перевода» — система всё делает автоматически и даёт чувство безопасности.'
		},
		{
			icon: '🔥',
			tag: 'Last Spots',
			title: 'Бронируй сейчас — мест мало',
			short: 'Автоматический триггер дефицита. Платформа мотивирует не откладывать.',
			details: 'Когда мест остаётся мало — появляется бейдж «Last spots». Это не обман, а реальные данные. В переписке такое ощущение срочности создать невозможно, а платформа делает это автоматически.'
		}
	];
</script>

<!-- Platform Manifest Section -->
<section class="relative overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-b from-lavender-900 via-lavender-900 to-brand"></div>
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-[120px]"></div>
		<div class="absolute bottom-10 right-10 w-96 h-96 bg-brand rounded-full blur-[150px]"></div>
	</div>

	<div class="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
				<span class="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
				<span class="text-xs font-medium text-lavender-200 tracking-wider uppercase">Digital Platform · New Generation</span>
			</div>

			<h2 class="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
				Теплее, чем переписка.<br />
				<span class="text-accent">Быстрее, чем менеджер.</span>
			</h2>

			<p class="text-lg text-lavender-300 max-w-2xl mx-auto leading-relaxed">
				Liberty — это не просто сайт для бронирования. Это цифровая платформа нового
				поколения с AI, которая делает запись на ивент приятнее и проще, чем переписка в Direct.
			</p>
		</div>

		<!-- Features -->
		<div class="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12">
			{#each features as feature, i}
				<button
					class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-left
						hover:bg-white/10 hover:border-white/20 transition-all duration-300
						{expandedFeature === i ? 'bg-white/10 border-white/20 ring-1 ring-accent/30' : ''}"
					onclick={() => (expandedFeature = expandedFeature === i ? null : i)}
				>
					<div class="flex items-start gap-3">
						<span class="text-2xl">{feature.icon}</span>
						<div class="flex-1 min-w-0">
							<span class="inline-block px-2 py-0.5 bg-white/10 rounded text-[10px] font-medium text-lavender-200 uppercase tracking-wider mb-2">
								{feature.tag}
							</span>
							<h3 class="text-sm font-semibold text-white leading-snug mb-1.5">
								{feature.title}
							</h3>
							<p class="text-xs text-lavender-400 leading-relaxed">
								{feature.short}
							</p>
						</div>
					</div>

					<!-- Expand indicator -->
					<div class="absolute bottom-2 right-3 text-lavender-500 text-xs transition-transform {expandedFeature === i ? 'rotate-180' : ''}">
						↓
					</div>
				</button>
			{/each}
		</div>

		<!-- Expanded detail -->
		{#if expandedFeature !== null}
			<div class="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto">
				<div class="flex items-start gap-4">
					<span class="text-3xl">{features[expandedFeature].icon}</span>
					<div>
						<h3 class="font-display text-lg font-bold text-white mb-3">
							{features[expandedFeature].title}
						</h3>
						<p class="text-lavender-300 leading-relaxed">
							{features[expandedFeature].details}
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Bottom CTA -->
		<div class="text-center">
			<div class="inline-flex flex-col sm:flex-row items-center gap-4">
				<a
					href="/events"
					class="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-amber-500 transition-colors shadow-lg shadow-accent/25"
				>
					Попробовать сейчас
				</a>
				<span class="text-sm text-lavender-400">
					Бронирование в 3 клика · Без регистрации · AI-помощник 24/7
				</span>
			</div>
		</div>
	</div>
</section>
