<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let showComparison = $state(false);
</script>

<svelte:head>
	<title>Licensed City Partner — Liberty Bureau</title>
	<meta name="description" content="Подключитесь к экосистеме Liberty Bureau. Модель Licensed City Partner Platform — современная альтернатива франшизе для креативного бизнеса." />
</svelte:head>

<!-- Hero -->
<section class="relative bg-gradient-to-br from-brand to-lavender-800 text-white overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
		<div class="max-w-3xl">
			<p class="text-sm font-medium text-lavender-200 mb-4 tracking-wider uppercase">Licensed City Partner Platform</p>
			<h1 class="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
				Не франшиза.<br />
				<span class="text-accent">Операционная система</span> для лайфстайл-бизнеса
			</h1>
			<p class="text-lg md:text-xl text-lavender-200 leading-relaxed mb-8">
				Вы не покупаете бизнес-точку — вы подключаетесь к экосистеме.
				Платформа берёт на себя рутину, оставляя вам творчество и общение с гостями.
			</p>
			<div class="flex flex-wrap gap-4">
				<a
					href="#apply"
					class="px-8 py-3 bg-white text-brand font-semibold rounded-full hover:bg-lavender-100 transition-colors"
				>
					Стать партнёром
				</a>
				<a
					href="#how-it-works"
					class="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
				>
					Как это работает
				</a>
			</div>
		</div>
	</div>
	<div class="absolute -top-20 -right-20 w-96 h-96 bg-lavender-600/20 rounded-full blur-3xl"></div>
	<div class="absolute -bottom-40 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
</section>

<!-- Key Idea -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="bg-gradient-to-r from-lavender-50 to-white rounded-3xl p-8 md:p-12 border border-lavender-100">
		<div class="max-w-3xl mx-auto text-center">
			<span class="text-4xl mb-4 block">💡</span>
			<h2 class="font-display text-2xl md:text-3xl font-bold text-lavender-900 mb-4">
				Суть модели LCPP
			</h2>
			<p class="text-lg text-lavender-600 leading-relaxed">
				Licensed City Partner Platform — это модель, где партнёр получает не жёсткую инструкцию «как жарить котлеты»,
				а доступ к <strong class="text-brand">операционной системе для лайфстайл-бизнеса</strong>,
				которая берёт на себя рутину (платежи, сайт, шаблоны), оставляя партнёру творчество и общение с гостями.
			</p>
		</div>
	</div>
</section>

<!-- LCPP vs Franchise Comparison -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="text-center mb-10">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Почему не франшиза</p>
		<h2 class="font-display text-3xl font-bold text-lavender-900">LCPP vs Классическая франшиза</h2>
		<p class="text-lavender-500 mt-2 max-w-2xl mx-auto">
			Термин «франшиза» ассоциируется с жёстким контролем и устаревшими форматами.
			Модель LCPP меняет парадигму.
		</p>
	</div>

	<div class="overflow-x-auto">
		<table class="w-full bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
			<thead>
				<tr class="bg-lavender-50">
					<th class="text-left px-6 py-4 text-sm font-semibold text-lavender-500 w-1/3">Характеристика</th>
					<th class="text-left px-6 py-4 text-sm font-semibold text-lavender-400 w-1/3">Классическая франшиза</th>
					<th class="text-left px-6 py-4 text-sm font-semibold text-brand w-1/3">LCPP Liberty</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-lavender-50">
				{#each [
					{ label: 'Предмет покупки', old: 'Покупка готового бизнеса («коробка»)', new: 'Подключение к цифровой экосистеме и бренду' },
					{ label: 'Уровень свободы', old: 'Жёсткие регламенты и инструкции', new: 'Стандарты + творческая свобода локализации' },
					{ label: 'Управление', old: 'Контроль сверху', new: 'Поддержка и доступ к инструментам' },
					{ label: 'Масштаб', old: 'Точка (студия, кафе)', new: 'Город (эксклюзив на территорию)' },
					{ label: 'Роль IT', old: 'CRM для отчётности', new: 'Платформа как «ОС» бизнеса' },
					{ label: 'Юридическая модель', old: 'Договор коммерческой концессии', new: 'Лицензионный договор (проще и гибче)' }
				] as row}
					<tr class="hover:bg-lavender-50/50">
						<td class="px-6 py-4 text-sm font-medium text-lavender-900">{row.label}</td>
						<td class="px-6 py-4 text-sm text-lavender-400">{row.old}</td>
						<td class="px-6 py-4 text-sm text-lavender-700 font-medium">{row.new}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<!-- How it works: Roles -->
<section id="how-it-works" class="bg-lavender-50 py-16">
	<div class="max-w-7xl mx-auto px-4">
		<div class="text-center mb-12">
			<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Разделение ответственности</p>
			<h2 class="font-display text-3xl font-bold text-lavender-900">Как распределяются роли</h2>
			<p class="text-lavender-500 mt-2">Партнёр занимается офлайном и эмоциями, HQ — цифрой и системой</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- HQ -->
			<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100">
				<div class="flex items-center gap-3 mb-6">
					<div class="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-2xl">🏢</div>
					<div>
						<h3 class="font-display text-xl font-bold text-lavender-900">Головной офис (HQ)</h3>
						<p class="text-sm text-brand">Digital Engine</p>
					</div>
				</div>
				<ul class="space-y-3">
					{#each [
						'Веб-платформа и цифровая инфраструктура',
						'Автоматизация бронирования и платежей',
						'Контент-стратегия и единый визуальный стиль',
						'Стандарты бренда и библиотека форматов',
						'Шаблоны ивентов (Event Menu)',
						'AI-ассистент Лавандик для поддержки'
					] as item}
						<li class="flex items-start gap-2 text-sm text-lavender-600">
							<span class="text-brand mt-0.5">✓</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Partner -->
			<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100">
				<div class="flex items-center gap-3 mb-6">
					<div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">👤</div>
					<div>
						<h3 class="font-display text-xl font-bold text-lavender-900">Партнёр (City Partner)</h3>
						<p class="text-sm text-accent">Владелец города</p>
					</div>
				</div>
				<ul class="space-y-3">
					{#each [
						'Проведение ивентов и управление площадками',
						'Работа с мастерами и хостами',
						'Развитие локального комьюнити',
						'Адаптация контента под местный рынок',
						'Управление городом как собственным бизнесом',
						'Живое общение с гостями и атмосфера'
					] as item}
						<li class="flex items-start gap-2 text-sm text-lavender-600">
							<span class="text-accent mt-0.5">✓</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Three Layers -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="text-center mb-12">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">3 уровня платформы</p>
		<h2 class="font-display text-3xl font-bold text-lavender-900">Что входит в лицензию</h2>
		<p class="text-lavender-500 mt-2">Три слоя системы, к которым получает доступ партнёр</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<!-- Brand -->
		<div class="relative bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 hover:shadow-lg transition-shadow">
			<div class="absolute -top-4 left-6 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Уровень 1</div>
			<span class="text-4xl block mb-4 mt-2">🎨</span>
			<h3 class="font-display text-xl font-bold text-lavender-900 mb-3">Бренд</h3>
			<p class="text-sm text-lavender-600 leading-relaxed">
				Право использовать визуальную систему Liberty, адаптируя её под свой город
				(например, <strong>Liberty Berlin</strong>). Единая премиальная эстетика
				без необходимости нанимать дизайнеров.
			</p>
		</div>

		<!-- Platform -->
		<div class="relative bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 hover:shadow-lg transition-shadow">
			<div class="absolute -top-4 left-6 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Уровень 2</div>
			<span class="text-4xl block mb-4 mt-2">⚙️</span>
			<h3 class="font-display text-xl font-bold text-lavender-900 mb-3">Платформа (ОС города)</h3>
			<ul class="text-sm text-lavender-600 space-y-2">
				<li class="flex items-start gap-2">
					<span class="text-brand">→</span>
					<span><strong>Hub Page</strong> — цифровая витрина города, которая выглядит как Instagram-профиль</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-brand">→</span>
					<span><strong>Кабинет партнёра</strong> — «пульт управления» для создания ивентов по шаблонам, управления расписанием и аналитики</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-brand">→</span>
					<span><strong>Бронирование и платежи</strong> — автоматическая обработка заказов и депозитов</span>
				</li>
			</ul>
		</div>

		<!-- Content -->
		<div class="relative bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 hover:shadow-lg transition-shadow">
			<div class="absolute -top-4 left-6 px-4 py-1 bg-brand text-white text-xs font-bold rounded-full">Уровень 3</div>
			<span class="text-4xl block mb-4 mt-2">📚</span>
			<h3 class="font-display text-xl font-bold text-lavender-900 mb-3">Контент</h3>
			<p class="text-sm text-lavender-600 leading-relaxed">
				<strong>Библиотека форматов (Event Menu)</strong> — готовые сценарии ивентов
				с ценами и описанием «что включено». Партнёру не нужно придумывать бизнес с нуля —
				он выбирает успешные форматы из меню и запускает их.
			</p>
		</div>
	</div>
</section>

<!-- AI Lavandik Section -->
<section class="bg-gradient-to-r from-lavender-50 to-white py-16">
	<div class="max-w-7xl mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div>
				<p class="text-sm font-medium text-brand mb-2 tracking-wider uppercase">AI вместо надзирателя</p>
				<h2 class="font-display text-3xl font-bold text-lavender-900 mb-6">
					Лавандик — мягкий стандарт качества
				</h2>
				<p class="text-lavender-600 leading-relaxed mb-6">
					В классической франшизе стандарты контролируют менеджеры и проверки.
					В модели LCPP контроль качества осуществляет AI-ассистент Лавандик —
					это «мягкий стандарт» без давления со стороны людей.
				</p>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 text-sm">👤</div>
						<div>
							<p class="font-semibold text-lavender-900 text-sm">Для партнёра</p>
							<p class="text-sm text-lavender-500">Помогает собирать ивенты, подсказывает если не хватает описания или фото, обучает работе с платформой</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center shrink-0 text-sm">⚙️</div>
						<div>
							<p class="font-semibold text-lavender-900 text-sm">Для системы</p>
							<p class="text-sm text-lavender-500">Обеспечивает соблюдение стандартов качества (Quality Score) без давления со стороны людей</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Chat preview -->
			<div class="bg-white rounded-2xl shadow-lg border border-lavender-100 overflow-hidden max-w-sm mx-auto md:mx-0 md:ml-auto">
				<div class="bg-brand text-white px-5 py-3">
					<p class="font-semibold text-sm">💜 Лавандик — AI помощник партнёра</p>
				</div>
				<div class="p-5 space-y-3">
					<div class="bg-lavender-100 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-lavender-900 max-w-[85%]">
						Привет! Я заметил, что у ивента «Керамика в Берлине» не заполнена программа (Agenda). Без неё карточка выглядит неполной. Добавить?
					</div>
					<div class="bg-brand text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[85%] ml-auto">
						Да, помоги составить
					</div>
					<div class="bg-lavender-100 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-lavender-900 max-w-[85%]">
						Готово! Создал программу из 4 этапов по шаблону «Керамика 2ч». Можешь отредактировать в кабинете 💜
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Advantages for Scaling -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="text-center mb-12">
		<p class="text-sm font-medium text-brand mb-1 tracking-wider uppercase">Масштабирование</p>
		<h2 class="font-display text-3xl font-bold text-lavender-900">Преимущества модели LCPP</h2>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 text-center">
			<div class="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📋</div>
			<h3 class="font-display text-lg font-bold text-lavender-900 mb-3">Юридическая лёгкость</h3>
			<p class="text-sm text-lavender-500">
				Лицензионный договор проще и гибче, чем договор коммерческой концессии,
				особенно на рынках ЕС и США.
			</p>
		</div>

		<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 text-center">
			<div class="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🚀</div>
			<h3 class="font-display text-lg font-bold text-lavender-900 mb-3">Низкий барьер входа</h3>
			<p class="text-sm text-lavender-500">
				Не нужно быть маркетологом или IT-специалистом —
				эти функции «зашиты» в платформу.
			</p>
		</div>

		<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100 text-center">
			<div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">💜</div>
			<h3 class="font-display text-lg font-bold text-lavender-900 mb-3">Сохранение «души»</h3>
			<p class="text-sm text-lavender-500">
				Модель позволяет избежать превращения креативного проекта в бездушный конвейер,
				сохраняя ощущение локального комьюнити.
			</p>
		</div>
	</div>
</section>

<!-- What you get (Original Benefits) -->
<section class="bg-lavender-50 py-16">
	<div class="max-w-7xl mx-auto px-4">
		<h2 class="font-display text-3xl font-bold text-lavender-900 mb-10 text-center">Что вы получаете</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{#each [
				{ icon: '🎨', title: 'Готовые форматы', desc: 'Библиотека проверенных сценариев ивентов (Event Menu) с методологией, ценами и описанием «что включено»' },
				{ icon: '📱', title: 'Маркетинг и контент', desc: 'Единая digital-стратегия, Instagram-контент, визуальные шаблоны и поддержка от HQ' },
				{ icon: '🤝', title: 'Обучение и наставничество', desc: 'Полный курс запуска, AI-ассистент Лавандик и сообщество партнёров' },
				{ icon: '💻', title: 'Платформа (ОС)', desc: 'Hub Page, кабинет партнёра, система бронирования, CRM и аналитика' },
				{ icon: '🌍', title: 'Эксклюзив на город', desc: 'Статус «владельца города» с правом на бренд Liberty в вашем регионе' },
				{ icon: '📈', title: 'Масштабирование', desc: 'Помощь в расширении от одной площадки до полноценной городской сети' }
			] as item}
				<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 hover:shadow-md transition-shadow">
					<span class="text-3xl mb-3 block">{item.icon}</span>
					<h3 class="font-semibold text-lavender-900 mb-2">{item.title}</h3>
					<p class="text-sm text-lavender-500">{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Application Form -->
<section id="apply" class="max-w-2xl mx-auto px-4 py-16">
	<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100">
		<h2 class="font-display text-2xl font-bold text-lavender-900 mb-2">Стать City Partner</h2>
		<p class="text-lavender-500 mb-6">Заполните форму — мы свяжемся с вами в течение 48 часов</p>

		{#if form?.success}
			<div class="text-center py-8">
				<p class="text-4xl mb-3">🎉</p>
				<h3 class="font-display text-xl font-bold text-lavender-900 mb-2">Заявка отправлена!</h3>
				<p class="text-lavender-500">Мы свяжемся с вами в ближайшее время</p>
			</div>
		{:else}
			{#if form?.error}
				<div class="mb-4 px-4 py-3 bg-danger/10 border border-danger/30 rounded-xl text-sm text-danger">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/submit" use:enhance class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-lavender-700 mb-1">Имя *</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						value={form?.values?.name || ''}
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
					/>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label for="email" class="block text-sm font-medium text-lavender-700 mb-1">Email *</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form?.values?.email || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
					<div>
						<label for="phone" class="block text-sm font-medium text-lavender-700 mb-1">Телефон *</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							required
							value={form?.values?.phone || ''}
							class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						/>
					</div>
				</div>

				<div>
					<label for="city" class="block text-sm font-medium text-lavender-700 mb-1">Ваш город *</label>
					<input
						id="city"
						name="city"
						type="text"
						required
						value={form?.values?.city || ''}
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand"
						placeholder="Город, в котором хотите стать партнёром"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-lavender-700 mb-1">О себе</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand resize-none"
						placeholder="Расскажите о себе, вашем опыте и почему хотите стать City Partner"
					>{form?.values?.message || ''}</textarea>
				</div>

				<button
					type="submit"
					class="w-full px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors shadow-lg shadow-brand/25"
				>
					Отправить заявку
				</button>
			</form>
		{/if}
	</div>
</section>
