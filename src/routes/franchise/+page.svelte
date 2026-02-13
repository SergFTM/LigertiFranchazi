<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Франшиза — Liberty Bureau</title>
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-br from-brand to-lavender-800 text-white">
	<div class="max-w-7xl mx-auto px-4 py-20 md:py-28">
		<div class="max-w-2xl">
			<p class="text-sm font-medium text-lavender-200 mb-4 tracking-wider uppercase">Партнёрство</p>
			<h1 class="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
				Откройте Liberty Bureau в своём городе
			</h1>
			<p class="text-lg text-lavender-200 leading-relaxed">
				Запускайте творческие мастер-классы под известным брендом.
				Полная поддержка, обучение и маркетинг от HQ.
			</p>
		</div>
	</div>
</section>

<!-- Benefits -->
<section class="max-w-7xl mx-auto px-4 py-16">
	<h2 class="font-display text-3xl font-bold text-lavender-900 mb-10 text-center">Что вы получаете</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		{#each [
			{ icon: '🎨', title: 'Готовые форматы', desc: 'Проверенные шаблоны ивентов с методологией и материалами' },
			{ icon: '📱', title: 'Маркетинг', desc: 'Единая digital-стратегия, контент и поддержка Instagram' },
			{ icon: '🤝', title: 'Обучение', desc: 'Полный курс запуска, наставничество и сообщество партнёров' },
			{ icon: '💼', title: 'Платформа', desc: 'Доступ к системе бронирования, CRM и аналитике' },
			{ icon: '🌍', title: 'Бренд', desc: 'Использование известного бренда Liberty Bureau в вашем регионе' },
			{ icon: '📈', title: 'Масштабирование', desc: 'Помощь в расширении от 1 до нескольких студий' }
		] as item}
			<div class="bg-white rounded-2xl p-6 shadow-sm border border-lavender-100 hover:shadow-md transition-shadow">
				<span class="text-3xl mb-3 block">{item.icon}</span>
				<h3 class="font-semibold text-lavender-900 mb-2">{item.title}</h3>
				<p class="text-sm text-lavender-500">{item.desc}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Application Form -->
<section class="max-w-2xl mx-auto px-4 py-16">
	<div class="bg-white rounded-2xl p-8 shadow-sm border border-lavender-100">
		<h2 class="font-display text-2xl font-bold text-lavender-900 mb-2">Оставить заявку</h2>
		<p class="text-lavender-500 mb-6">Мы свяжемся с вами в течение 48 часов</p>

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
						placeholder="Город, в котором хотите открыть студию"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-lavender-700 mb-1">Сообщение</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						class="w-full px-4 py-2.5 border border-lavender-200 rounded-xl text-sm focus:outline-none focus:border-brand resize-none"
						placeholder="Расскажите о себе и вашем опыте"
					>{form?.values?.message || ''}</textarea>
				</div>

				<button
					type="submit"
					class="w-full px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-lavender-700 transition-colors"
				>
					Отправить заявку
				</button>
			</form>
		{/if}
	</div>
</section>
