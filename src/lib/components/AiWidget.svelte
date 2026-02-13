<script lang="ts">
	let isOpen = $state(false);
	let messages = $state<{ role: 'user' | 'bot'; text: string }[]>([
		{ role: 'bot', text: 'Привет! Я Лавандик 💜 Чем могу помочь?' }
	]);
	let input = $state('');

	const quickQuestions = [
		'Можно без опыта?',
		'Что включено в стоимость?',
		'Как найти студию?',
		'Можно прийти с ребёнком?'
	];

	const answers: Record<string, string> = {
		'Можно без опыта?':
			'Конечно! Все наши мастер-классы рассчитаны на любой уровень подготовки. Мастер поможет на каждом этапе.',
		'Что включено в стоимость?':
			'Все материалы, инструменты, приветственный напиток и готовое изделие, которое вы заберёте с собой.',
		'Как найти студию?':
			'Адрес указан на странице ивента. За день до мероприятия мы отправим вам точную геолокацию и инструкцию.',
		'Можно прийти с ребёнком?':
			'Зависит от ивента. У нас есть специальные детские мастер-классы. На взрослые ивенты — от 14 лет.'
	};

	function sendMessage(text: string) {
		if (!text.trim()) return;
		messages = [...messages, { role: 'user', text }];
		input = '';

		const answer = answers[text] || 'Спасибо за вопрос! Наш менеджер свяжется с вами в ближайшее время. Или напишите нам в Instagram @libertybureau 💜';

		setTimeout(() => {
			messages = [...messages, { role: 'bot', text: answer }];
		}, 500);
	}
</script>

<!-- Floating button -->
<button
	class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center text-2xl"
	onclick={() => (isOpen = !isOpen)}
	aria-label="Чат с Лавандиком"
>
	{isOpen ? '✕' : '💜'}
</button>

<!-- Chat panel -->
{#if isOpen}
	<div class="fixed bottom-24 right-6 z-50 w-80 max-h-[28rem] bg-white rounded-2xl shadow-2xl border border-lavender-100 flex flex-col overflow-hidden">
		<!-- Header -->
		<div class="bg-brand text-white px-4 py-3">
			<p class="font-semibold text-sm">Лавандик — AI помощник</p>
			<p class="text-xs text-lavender-200">Спросите что угодно о наших ивентах</p>
		</div>

		<!-- Messages -->
		<div class="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
			{#each messages as msg}
				<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[80%] px-3 py-2 rounded-2xl text-sm {msg.role === 'user'
							? 'bg-brand text-white rounded-br-md'
							: 'bg-lavender-100 text-lavender-900 rounded-bl-md'}"
					>
						{msg.text}
					</div>
				</div>
			{/each}
		</div>

		<!-- Quick questions -->
		{#if messages.length <= 2}
			<div class="px-4 pb-2 flex flex-wrap gap-1.5">
				{#each quickQuestions as q}
					<button
						class="text-xs px-3 py-1.5 bg-lavender-50 text-lavender-600 rounded-full hover:bg-lavender-100 transition-colors"
						onclick={() => sendMessage(q)}
					>
						{q}
					</button>
				{/each}
			</div>
		{/if}

		<!-- Input -->
		<div class="border-t border-lavender-100 p-3 flex gap-2">
			<input
				type="text"
				bind:value={input}
				placeholder="Ваш вопрос..."
				class="flex-1 px-3 py-2 border border-lavender-200 rounded-full text-sm focus:outline-none focus:border-brand"
				onkeydown={(e) => e.key === 'Enter' && sendMessage(input)}
			/>
			<button
				class="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center text-sm hover:bg-lavender-700 transition-colors"
				onclick={() => sendMessage(input)}
			>
				↑
			</button>
		</div>
	</div>
{/if}
