<script lang="ts">
	import { formatPrice, formatDate, remainingSpots, isLastSpots, CATEGORY_LABELS, CATEGORY_EMOJI } from '$lib/types';

	let { data } = $props();

	// Tab navigation
	type Tab = 'overview' | 'events' | 'guests' | 'content' | 'analytics' | 'guide';
	let activeTab = $state<Tab>('guide');

	const tabs: { id: Tab; label: string; icon: string }[] = [
		{ id: 'guide', label: 'Знакомство', icon: '💜' },
		{ id: 'overview', label: 'Обзор', icon: '📊' },
		{ id: 'events', label: 'Ивенты', icon: '📅' },
		{ id: 'guests', label: 'Гости', icon: '👥' },
		{ id: 'content', label: 'Контент', icon: '📸' },
		{ id: 'analytics', label: 'Аналитика', icon: '📈' }
	];

	// Guide steps
	let guideStep = $state(0);
	const guideSteps = [
		{
			title: 'Добро пожаловать в вашу ОС города',
			subtitle: 'Lifestyle Control Panel',
			content: 'Это не скучная CRM-система с воронками продаж. Это ваш «пульт управления» городом — операционная система, которая заменяет ручное управление через Direct и Excel. Интерфейс выполнен в фирменных лавандовых тонах, чтобы работа приносила удовольствие.',
			principle: 'Меньше администрирования, больше ивентов',
			icon: '🎛️'
		},
		{
			title: 'Event Wizard — конструктор ивентов',
			subtitle: 'Управление мероприятиями',
			content: 'Вы не создаёте мероприятия «с нуля». Система работает как конструктор: выберите готовый сценарий из библиотеки форматов (Event Menu), где уже прописаны цены, длительность и описание «что включено». Если формат «зашёл» — одна кнопка Duplicate скопирует его с новой датой.',
			principle: 'Agenda Builder обязателен — без таймлайна система не даст опубликовать ивент',
			icon: '🎨'
		},
		{
			title: 'Работа с гостями',
			subtitle: 'Замена Direct и Excel',
			content: 'Система полностью заменяет переписку в Direct. Вы видите всех записавшихся, их контакты и статус оплаты. Простая воронка: New → Pending Deposit → Confirmed → Completed. Функция Check-in для отметки прибытия гостей. Когда группа заполняется — автоматический «Last spots» для ажиотажа.',
			principle: 'Все гости в одном месте, а не разбросаны по директу',
			icon: '👥'
		},
		{
			title: 'Контент и стандарты',
			subtitle: 'Instagram-first подход',
			content: 'Визуальное качество контролируется системой, так как Instagram — главный канал продаж. Обязательные 4 квадратных фото (IG Preview) для профиля города и обложки ивентов. Если контент не соответствует стандартам, система или HQ могут временно скрыть город или ивент до исправления.',
			principle: 'Каждая карточка должна выглядеть как пост в Instagram',
			icon: '📸'
		},
		{
			title: 'AI Лавандик — ваш наставник',
			subtitle: 'Мягкий контролёр качества',
			content: 'Внутри кабинета работает AI-ассистент, который заменяет инструкции и проверки. Лавандик подсказывает, если ивент заполнен не полностью, помогает придумывать подписи к постам или Reels, проводит Quality Check и обучает работе с платформой.',
			principle: 'AI вместо надзирателя — мягкий стандарт без давления',
			icon: '💜'
		},
		{
			title: 'Аналитика для действий',
			subtitle: 'Только нужные цифры',
			content: 'Вместо сложных отчётов вы видите только те цифры, которые ведут к действиям: GMV (общий оборот города), конверсия заполняемости групп и популярность форматов. Это подскажет, что стоит повторить, а что — улучшить.',
			principle: 'Данные ради действий, а не ради отчётов',
			icon: '📈'
		}
	];

	const currentGuide = $derived(guideSteps[guideStep]);

	// Status helpers
	const statusLabels: Record<string, string> = {
		new: 'Новая',
		awaiting_deposit: 'Ожидание депозита',
		confirmed: 'Подтверждена',
		cancelled: 'Отменена'
	};
	const statusColors: Record<string, string> = {
		new: 'bg-blue-100 text-blue-700',
		awaiting_deposit: 'bg-amber-100 text-amber-700',
		confirmed: 'bg-green-100 text-green-700',
		cancelled: 'bg-red-100 text-red-700'
	};
</script>

<svelte:head>
	<title>Кабинет партнёра — Liberty Bureau</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
		<div>
			<p class="text-sm text-brand font-medium tracking-wider uppercase">Lifestyle Control Panel</p>
			<h1 class="font-display text-3xl font-bold text-lavender-900">Кабинет партнёра</h1>
			<p class="text-lavender-500 text-sm mt-1">Операционная система вашего города</p>
		</div>
		<button
			class="self-start px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-full hover:bg-lavender-700 transition-colors shadow-lg shadow-brand/20"
		>
			+ Новый ивент
		</button>
	</div>

	<!-- Tabs -->
	<div class="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
		{#each tabs as tab}
			<button
				class="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
					{activeTab === tab.id
					? 'bg-brand text-white shadow-sm'
					: 'bg-white text-lavender-600 hover:bg-lavender-50 border border-lavender-100'}"
				onclick={() => (activeTab = tab.id)}
			>
				<span>{tab.icon}</span>
				<span>{tab.label}</span>
			</button>
		{/each}
	</div>

	<!-- ==================== GUIDE TAB ==================== -->
	{#if activeTab === 'guide'}
		<div class="space-y-6">
			<!-- Welcome banner -->
			<div class="bg-gradient-to-r from-brand to-lavender-700 rounded-2xl p-6 md:p-8 text-white">
				<div class="flex items-start gap-4">
					<span class="text-4xl">{currentGuide.icon}</span>
					<div class="flex-1">
						<p class="text-xs text-lavender-200 font-medium uppercase tracking-wider mb-1">Шаг {guideStep + 1} из {guideSteps.length}</p>
						<h2 class="font-display text-2xl font-bold mb-1">{currentGuide.title}</h2>
						<p class="text-lavender-200 text-sm">{currentGuide.subtitle}</p>
					</div>
				</div>
			</div>

			<!-- Guide content -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Main content -->
				<div class="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-lavender-100">
					<p class="text-lavender-600 leading-relaxed mb-6">{currentGuide.content}</p>

					<div class="bg-lavender-50 rounded-xl p-4 flex items-start gap-3">
						<span class="text-brand text-lg">💡</span>
						<div>
							<p class="text-xs font-semibold text-brand uppercase tracking-wider mb-1">Принцип</p>
							<p class="text-sm font-medium text-lavender-900">{currentGuide.principle}</p>
						</div>
					</div>

					<!-- Navigation -->
					<div class="flex items-center justify-between mt-8 pt-6 border-t border-lavender-100">
						<button
							class="px-5 py-2 border border-lavender-200 text-lavender-600 text-sm font-medium rounded-full hover:bg-lavender-50 transition-colors disabled:opacity-30"
							disabled={guideStep === 0}
							onclick={() => (guideStep = Math.max(0, guideStep - 1))}
						>
							← Назад
						</button>
						<span class="text-xs text-lavender-400">{guideStep + 1} / {guideSteps.length}</span>
						{#if guideStep < guideSteps.length - 1}
							<button
								class="px-5 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-lavender-700 transition-colors"
								onclick={() => (guideStep = Math.min(guideSteps.length - 1, guideStep + 1))}
							>
								Далее →
							</button>
						{:else}
							<button
								class="px-5 py-2 bg-success text-white text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
								onclick={() => (activeTab = 'overview')}
							>
								Перейти к кабинету ✓
							</button>
						{/if}
					</div>
				</div>

				<!-- Step sidebar -->
				<div class="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100 h-fit">
					<h3 class="text-sm font-semibold text-lavender-900 mb-4">Содержание</h3>
					<div class="space-y-1">
						{#each guideSteps as step, i}
							<button
								class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
									{i === guideStep
									? 'bg-brand/10 text-brand font-medium'
									: i < guideStep
										? 'text-lavender-400 hover:bg-lavender-50'
										: 'text-lavender-600 hover:bg-lavender-50'}"
								onclick={() => (guideStep = i)}
							>
								<span class="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0
									{i === guideStep
									? 'bg-brand text-white'
									: i < guideStep
										? 'bg-success/20 text-success'
										: 'bg-lavender-100 text-lavender-400'}">
									{i < guideStep ? '✓' : i + 1}
								</span>
								<span class="truncate">{step.title}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Interactive demo per step -->
			{#if guideStep === 1}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>🧪</span> Попробуйте: Библиотека форматов (Event Menu)
					</h3>
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						{#each [
							{ emoji: '🏺', name: 'Гончарное дело', duration: '2ч', price: '€65' },
							{ emoji: '🌸', name: 'Парфюмерия', duration: '2.5ч', price: '€85' },
							{ emoji: '🕯️', name: 'Свечеварение', duration: '1.5ч', price: '€55' },
							{ emoji: '💐', name: 'Флористика', duration: '2ч', price: '€70' },
							{ emoji: '🍷', name: 'Вино', duration: '3ч', price: '€120' },
							{ emoji: '🧒', name: 'Детская студия', duration: '1.5ч', price: '€35' },
							{ emoji: '👨‍🍳', name: 'Кулинария', duration: '2.5ч', price: '€90' },
							{ emoji: '🎨', name: 'Арт-бранч', duration: '2ч', price: '€75' }
						] as format}
							<div class="bg-lavender-50 rounded-xl p-4 text-center hover:bg-lavender-100 transition-colors cursor-pointer border border-transparent hover:border-brand/20">
								<span class="text-2xl block mb-2">{format.emoji}</span>
								<p class="text-sm font-medium text-lavender-900">{format.name}</p>
								<p class="text-xs text-lavender-400 mt-1">{format.duration} · {format.price}</p>
							</div>
						{/each}
					</div>
					<p class="text-xs text-lavender-400 mt-4 text-center">Выберите формат → настройте дату и город → опубликуйте. Кнопка <strong>Duplicate</strong> скопирует успешный ивент одним кликом.</p>
				</div>
			{/if}

			{#if guideStep === 2}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>🧪</span> Попробуйте: Воронка бронирований
					</h3>
					<div class="flex flex-wrap gap-3 justify-center">
						{#each [
							{ label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'Заявка получена', count: 3 },
							{ label: 'Pending Deposit', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Ждём предоплату', count: 5 },
							{ label: 'Confirmed', color: 'bg-green-100 text-green-700 border-green-200', desc: 'Оплата получена', count: 8 },
							{ label: 'Completed', color: 'bg-lavender-100 text-lavender-700 border-lavender-200', desc: 'Гость пришёл ✓', count: 12 }
						] as stage, i}
							<div class="flex items-center gap-2">
								<div class="border rounded-xl p-4 text-center min-w-[120px] {stage.color}">
									<p class="text-2xl font-bold">{stage.count}</p>
									<p class="text-xs font-medium mt-1">{stage.label}</p>
									<p class="text-[10px] opacity-70 mt-0.5">{stage.desc}</p>
								</div>
								{#if i < 3}
									<span class="text-lavender-300 text-lg">→</span>
								{/if}
							</div>
						{/each}
					</div>
					<p class="text-xs text-lavender-400 mt-4 text-center">Check-in: отмечайте прибытие гостей прямо в системе. Last Spots включается автоматически.</p>
				</div>
			{/if}

			{#if guideStep === 3}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>🧪</span> Стандарты контента: IG Preview
					</h3>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-lg mx-auto">
						{#each [1, 2, 3, 4] as n}
							<div class="aspect-square bg-lavender-100 rounded-xl flex items-center justify-center border-2 border-dashed border-lavender-300">
								<div class="text-center">
									<span class="text-2xl block mb-1">📷</span>
									<p class="text-[10px] text-lavender-400 font-medium">Фото {n}/4</p>
									<p class="text-[10px] text-lavender-300">1:1</p>
								</div>
							</div>
						{/each}
					</div>
					<div class="mt-4 bg-amber-50 rounded-xl p-3 flex items-start gap-2">
						<span class="text-amber-500">⚠️</span>
						<p class="text-xs text-amber-700">Все 4 фото обязательны для публикации профиля города. Формат: квадрат 1:1, минимум 800×800px.</p>
					</div>
				</div>
			{/if}

			{#if guideStep === 4}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>🧪</span> Лавандик в действии
					</h3>
					<div class="max-w-md mx-auto bg-lavender-50 rounded-2xl overflow-hidden">
						<div class="bg-brand text-white px-4 py-2.5 text-sm font-medium">💜 Лавандик — Quality Check</div>
						<div class="p-4 space-y-3">
							<div class="bg-white rounded-xl px-3 py-2 text-sm text-lavender-900 max-w-[85%]">
								Проверяю ивент «Керамика в Берлине»...
							</div>
							<div class="bg-white rounded-xl px-3 py-2 text-sm max-w-[90%]">
								<p class="text-danger font-medium text-xs mb-1">❌ Не хватает:</p>
								<ul class="text-xs text-lavender-600 space-y-1">
									<li>• Agenda (таймлайн программы) — обязательно</li>
									<li>• Обложка ивента — рекомендуется 4:5</li>
								</ul>
							</div>
							<div class="bg-white rounded-xl px-3 py-2 text-sm max-w-[90%]">
								<p class="text-success font-medium text-xs mb-1">✅ Всё хорошо:</p>
								<ul class="text-xs text-lavender-600 space-y-1">
									<li>• Описание заполнено</li>
									<li>• Цена указана</li>
									<li>• Город и площадка выбраны</li>
								</ul>
							</div>
							<div class="bg-brand/10 rounded-xl px-3 py-2 text-sm text-brand max-w-[85%]">
								💡 Могу сгенерировать Agenda по шаблону «Керамика 2ч». Создать?
							</div>
						</div>
					</div>
				</div>
			{/if}

			{#if guideStep === 5}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>🧪</span> Ваши ключевые метрики
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div class="bg-lavender-50 rounded-xl p-5 text-center">
							<p class="text-3xl font-bold text-brand">{formatPrice(data.totalRevenue)}</p>
							<p class="text-xs text-lavender-500 mt-1">GMV — общий оборот города</p>
						</div>
						<div class="bg-lavender-50 rounded-xl p-5 text-center">
							<p class="text-3xl font-bold text-brand">
								{data.events.length > 0
									? Math.round(data.events.reduce((s, e) => s + (e.capacity > 0 ? (e.booked_count / e.capacity) * 100 : 0), 0) / data.events.length)
									: 0}%
							</p>
							<p class="text-xs text-lavender-500 mt-1">Конверсия заполняемости</p>
						</div>
						<div class="bg-lavender-50 rounded-xl p-5 text-center">
							{#each [Object.entries(data.categoryPopularity).sort(([,a], [,b]) => Number(b) - Number(a))[0]] as topCat}
								<p class="text-3xl font-bold text-brand">
									{topCat ? (CATEGORY_EMOJI[topCat[0] as keyof typeof CATEGORY_EMOJI] || '✨') : '—'}
								</p>
							{/each}
							<p class="text-xs text-lavender-500 mt-1">Самый популярный формат</p>
						</div>
					</div>
				</div>
			{/if}
		</div>

	<!-- ==================== OVERVIEW TAB ==================== -->
	{:else if activeTab === 'overview'}
		<div class="space-y-6">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				{#each [
					{ label: 'Ивентов', value: data.events.length, icon: '📅', sub: 'активных' },
					{ label: 'Бронирований', value: data.totalBookings, icon: '🎟️', sub: 'всего' },
					{ label: 'Выручка', value: formatPrice(data.totalRevenue), icon: '💰', sub: 'GMV' },
					{ label: 'Городов', value: new Set(data.events.map((e) => e.city_id)).size, icon: '🌍', sub: 'подключено' }
				] as stat}
					<div class="bg-white rounded-2xl p-5 shadow-sm border border-lavender-100">
						<span class="text-2xl">{stat.icon}</span>
						<p class="text-2xl font-bold text-lavender-900 mt-2">{stat.value}</p>
						<p class="text-xs text-lavender-400">{stat.label} <span class="text-lavender-300">· {stat.sub}</span></p>
					</div>
				{/each}
			</div>

			<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each [
					{ icon: '➕', label: 'Новый ивент', desc: 'Из библиотеки' },
					{ icon: '📋', label: 'Duplicate', desc: 'Копировать ивент' },
					{ icon: '✅', label: 'Check-in', desc: 'Отметить гостей' },
					{ icon: '💜', label: 'Лавандик', desc: 'AI-помощник' }
				] as action}
					<button class="bg-white rounded-xl p-4 shadow-sm border border-lavender-100 text-center hover:shadow-md hover:border-brand/20 transition-all">
						<span class="text-2xl block mb-1">{action.icon}</span>
						<p class="text-sm font-medium text-lavender-900">{action.label}</p>
						<p class="text-xs text-lavender-400">{action.desc}</p>
					</button>
				{/each}
			</div>

			<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
				<div class="px-6 py-4 border-b border-lavender-100 flex items-center justify-between">
					<h2 class="font-semibold text-lavender-900">Ближайшие ивенты</h2>
					<button class="text-xs text-brand font-medium" onclick={() => (activeTab = 'events')}>Все →</button>
				</div>
				<div class="divide-y divide-lavender-50">
					{#each data.events.slice(0, 3) as event}
						<div class="px-6 py-4 flex items-center gap-4">
							<img src={event.cover_image} alt="" class="w-12 h-12 rounded-xl object-cover shrink-0" />
							<div class="flex-1 min-w-0">
								<p class="font-medium text-lavender-900 text-sm truncate">{event.title_ru}</p>
								<p class="text-xs text-lavender-400">{formatDate(event.start_at)} · {event.city?.name}</p>
							</div>
							<div class="text-right shrink-0">
								<p class="text-sm font-bold text-lavender-900">{event.booked_count}/{event.capacity}</p>
								{#if isLastSpots(event)}
									<p class="text-[10px] text-accent font-bold">Last spots!</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

	<!-- ==================== EVENTS TAB ==================== -->
	{:else if activeTab === 'events'}
		<div class="space-y-6">
			<div class="bg-gradient-to-r from-lavender-50 to-white rounded-2xl p-5 border border-lavender-100 flex items-start gap-3">
				<span class="text-xl">💡</span>
				<div>
					<p class="text-sm font-medium text-lavender-900">Совет: используйте библиотеку форматов</p>
					<p class="text-xs text-lavender-500">Нажмите «+ Новый ивент» и выберите готовый шаблон из Event Menu. Кнопка Duplicate скопирует успешный ивент одним кликом.</p>
				</div>
			</div>

			<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
				<div class="px-6 py-4 border-b border-lavender-100">
					<h2 class="font-semibold text-lavender-900">Мои ивенты</h2>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead class="bg-lavender-50 text-lavender-500 text-xs uppercase">
							<tr>
								<th class="text-left px-6 py-3 font-medium">Название</th>
								<th class="text-left px-6 py-3 font-medium">Категория</th>
								<th class="text-left px-6 py-3 font-medium">Дата</th>
								<th class="text-left px-6 py-3 font-medium">Места</th>
								<th class="text-left px-6 py-3 font-medium">Заполнение</th>
								<th class="text-left px-6 py-3 font-medium">Статус</th>
								<th class="text-left px-6 py-3 font-medium"></th>
							</tr>
						</thead>
						<tbody class="divide-y divide-lavender-50">
							{#each data.events as event}
								{@const fillPercent = event.capacity > 0 ? Math.round((event.booked_count / event.capacity) * 100) : 0}
								<tr class="hover:bg-lavender-50/50">
									<td class="px-6 py-4">
										<div class="flex items-center gap-3">
											<img src={event.cover_image} alt="" class="w-10 h-10 rounded-lg object-cover shrink-0" />
											<div>
												<p class="font-medium text-lavender-900">{event.title_ru}</p>
												<p class="text-xs text-lavender-400">{event.city?.name}</p>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 text-lavender-600">
										{CATEGORY_EMOJI[event.category]} {CATEGORY_LABELS[event.category]}
									</td>
									<td class="px-6 py-4 text-lavender-600 text-xs">{formatDate(event.start_at)}</td>
									<td class="px-6 py-4">
										<span class="text-lavender-600">{event.booked_count}/{event.capacity}</span>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
											<div class="w-16 h-1.5 bg-lavender-100 rounded-full overflow-hidden">
												<div
													class="h-full rounded-full {fillPercent >= 80 ? 'bg-accent' : fillPercent >= 50 ? 'bg-brand' : 'bg-lavender-300'}"
													style="width: {fillPercent}%"
												></div>
											</div>
											<span class="text-xs text-lavender-400">{fillPercent}%</span>
										</div>
									</td>
									<td class="px-6 py-4">
										<span class="px-2.5 py-1 rounded-full text-xs font-medium
											{event.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}">
											{event.status === 'published' ? 'Опубликован' : event.status}
										</span>
									</td>
									<td class="px-6 py-4">
										<button class="text-xs text-brand font-medium hover:underline">Duplicate</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>

	<!-- ==================== GUESTS TAB ==================== -->
	{:else if activeTab === 'guests'}
		<div class="space-y-6">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
				{#each [
					{ label: 'Новые', count: data.bookings.filter((b) => b.status === 'new').length, color: 'border-blue-200 bg-blue-50 text-blue-700' },
					{ label: 'Ожидание депозита', count: data.bookings.filter((b) => b.status === 'awaiting_deposit').length, color: 'border-amber-200 bg-amber-50 text-amber-700' },
					{ label: 'Подтверждены', count: data.bookings.filter((b) => b.status === 'confirmed').length, color: 'border-green-200 bg-green-50 text-green-700' },
					{ label: 'Все', count: data.bookings.length, color: 'border-lavender-200 bg-lavender-50 text-lavender-700' }
				] as s}
					<div class="rounded-xl border p-4 text-center {s.color}">
						<p class="text-2xl font-bold">{s.count}</p>
						<p class="text-xs font-medium mt-1">{s.label}</p>
					</div>
				{/each}
			</div>

			<div class="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
				<div class="px-6 py-4 border-b border-lavender-100">
					<h2 class="font-semibold text-lavender-900">Список гостей</h2>
				</div>
				{#if data.bookings.length === 0}
					<div class="px-6 py-12 text-center">
						<span class="text-3xl block mb-2">👥</span>
						<p class="text-lavender-500">Пока нет бронирований</p>
						<p class="text-xs text-lavender-400 mt-1">Они появятся здесь, когда гости забронируют место</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead class="bg-lavender-50 text-lavender-500 text-xs uppercase">
								<tr>
									<th class="text-left px-6 py-3 font-medium">Гость</th>
									<th class="text-left px-6 py-3 font-medium">Ивент</th>
									<th class="text-left px-6 py-3 font-medium">Мест</th>
									<th class="text-left px-6 py-3 font-medium">Сумма</th>
									<th class="text-left px-6 py-3 font-medium">Статус</th>
									<th class="text-left px-6 py-3 font-medium">Check-in</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-lavender-50">
								{#each data.bookings as booking}
									{@const evt = data.events.find((e) => e.id === booking.event_id)}
									<tr class="hover:bg-lavender-50/50">
										<td class="px-6 py-4">
											<p class="font-medium text-lavender-900">{booking.contact_info.name}</p>
											<p class="text-xs text-lavender-400">{booking.contact_info.phone}</p>
										</td>
										<td class="px-6 py-4 text-lavender-600 text-xs">{evt?.title_ru || '—'}</td>
										<td class="px-6 py-4 text-lavender-600">{booking.qty}</td>
										<td class="px-6 py-4 font-medium text-lavender-900">{formatPrice(booking.total_amount)}</td>
										<td class="px-6 py-4">
											<span class="px-2.5 py-1 rounded-full text-xs font-medium {statusColors[booking.status]}">
												{statusLabels[booking.status]}
											</span>
										</td>
										<td class="px-6 py-4">
											<button class="w-7 h-7 rounded-lg border border-lavender-200 flex items-center justify-center text-lavender-400 hover:bg-success/10 hover:border-success hover:text-success transition-colors">
												✓
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		</div>

	<!-- ==================== CONTENT TAB ==================== -->
	{:else if activeTab === 'content'}
		<div class="space-y-6">
			<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
				<h2 class="font-semibold text-lavender-900 mb-2">IG Preview — профиль города</h2>
				<p class="text-sm text-lavender-500 mb-4">4 квадратных фото обязательны для публикации профиля города на карте сети</p>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
					{#each data.cities.slice(0, 1) as city}
						{#each city.ig_previews as img, i}
							<div class="relative group aspect-square rounded-xl overflow-hidden border-2 border-success">
								<img src={img} alt="" class="w-full h-full object-cover" />
								<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
									<span class="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">Заменить</span>
								</div>
								<div class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-success text-white flex items-center justify-center text-xs">✓</div>
							</div>
						{/each}
					{/each}
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>📐</span> Стандарты обложек
					</h3>
					<ul class="space-y-2 text-sm text-lavender-600">
						<li class="flex items-center gap-2"><span class="text-success">✓</span> Формат: 1:1 или 4:5</li>
						<li class="flex items-center gap-2"><span class="text-success">✓</span> Мин. разрешение: 800×800px</li>
						<li class="flex items-center gap-2"><span class="text-success">✓</span> Естественный свет, тёплые тона</li>
						<li class="flex items-center gap-2"><span class="text-success">✓</span> Без текста поверх фото</li>
						<li class="flex items-center gap-2"><span class="text-danger">✕</span> Стоковые фото</li>
						<li class="flex items-center gap-2"><span class="text-danger">✕</span> Водяные знаки</li>
					</ul>
				</div>
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
					<h3 class="font-semibold text-lavender-900 mb-4 flex items-center gap-2">
						<span>💜</span> Помощь Лавандика
					</h3>
					<ul class="space-y-3 text-sm text-lavender-600">
						<li class="flex items-start gap-2"><span class="text-brand mt-0.5">→</span><span>Генерация подписей к постам на основе формата ивента</span></li>
						<li class="flex items-start gap-2"><span class="text-brand mt-0.5">→</span><span>Идеи для Reels и Stories</span></li>
						<li class="flex items-start gap-2"><span class="text-brand mt-0.5">→</span><span>Проверка соответствия фото стандартам</span></li>
						<li class="flex items-start gap-2"><span class="text-brand mt-0.5">→</span><span>Напоминания о необходимости контента</span></li>
					</ul>
				</div>
			</div>

			<div class="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex items-start gap-3">
				<span class="text-xl">⚠️</span>
				<div>
					<p class="text-sm font-medium text-amber-800">Модерация</p>
					<p class="text-xs text-amber-700 mt-1">
						Если контент не соответствует стандартам (плохое качество, отсутствие обложки), HQ может временно скрыть город или ивент.
						Лавандик предупредит вас заранее.
					</p>
				</div>
			</div>
		</div>

	<!-- ==================== ANALYTICS TAB ==================== -->
	{:else if activeTab === 'analytics'}
		<div class="space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 text-center">
					<p class="text-xs text-lavender-400 uppercase tracking-wider font-medium">GMV — оборот города</p>
					<p class="text-3xl font-bold text-brand mt-2">{formatPrice(data.totalRevenue)}</p>
					<p class="text-xs text-lavender-400 mt-2">Общий оборот от всех бронирований</p>
				</div>
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 text-center">
					<p class="text-xs text-lavender-400 uppercase tracking-wider font-medium">Конверсия заполняемости</p>
					<p class="text-3xl font-bold text-brand mt-2">
						{data.events.length > 0
							? Math.round(data.events.reduce((s, e) => s + (e.capacity > 0 ? (e.booked_count / e.capacity) * 100 : 0), 0) / data.events.length)
							: 0}%
					</p>
					<p class="text-xs text-lavender-400 mt-2">Средняя заполняемость групп</p>
				</div>
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 text-center">
					<p class="text-xs text-lavender-400 uppercase tracking-wider font-medium">Бронирований</p>
					<p class="text-3xl font-bold text-brand mt-2">{data.totalBookings}</p>
					<p class="text-xs text-lavender-400 mt-2">Подтверждено: {data.confirmedBookings}</p>
				</div>
			</div>

			<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100">
				<h3 class="font-semibold text-lavender-900 mb-4">Популярность форматов</h3>
				<p class="text-xs text-lavender-400 mb-4">Заполняемость по категориям — подскажет, что стоит повторить</p>
				<div class="space-y-3">
					{#each Object.entries(data.categoryPopularity).sort(([,a], [,b]) => Number(b) - Number(a)) as [cat, fill]}
						{@const label = CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
						{@const emoji = CATEGORY_EMOJI[cat as keyof typeof CATEGORY_EMOJI] || '✨'}
						<div class="flex items-center gap-3">
							<span class="w-6 text-center">{emoji}</span>
							<span class="text-sm text-lavender-700 w-24 shrink-0">{label}</span>
							<div class="flex-1 h-3 bg-lavender-100 rounded-full overflow-hidden">
								<div
									class="h-full rounded-full {Number(fill) >= 80 ? 'bg-accent' : Number(fill) >= 50 ? 'bg-brand' : 'bg-lavender-300'}"
									style="width: {fill}%"
								></div>
							</div>
							<span class="text-sm font-medium text-lavender-900 w-12 text-right">{fill}%</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-lavender-50 rounded-2xl p-5 border border-lavender-100 flex items-start gap-3">
				<span class="text-xl">💡</span>
				<div>
					<p class="text-sm font-medium text-lavender-900">Принцип аналитики Liberty</p>
					<p class="text-xs text-lavender-500 mt-1">Только те цифры, которые ведут к действиям. GMV показывает оборот, конверсия — эффективность маркетинга, а популярность форматов — что повторить.</p>
				</div>
			</div>
		</div>
	{/if}
</div>
