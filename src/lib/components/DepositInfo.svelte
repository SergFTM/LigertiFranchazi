<script lang="ts">
	import { formatPrice } from '$lib/types';

	interface Props {
		depositAmount: number;
		currency?: string;
	}

	let { depositAmount, currency = 'EUR' }: Props = $props();
</script>

<div class="bg-lavender-50 border border-lavender-200 rounded-2xl p-6 space-y-4">
	<h3 class="font-display text-lg font-bold text-lavender-900">Оплата депозита</h3>

	<div class="bg-white rounded-xl p-4 space-y-2">
		<p class="text-sm text-lavender-500">Сумма депозита (50%)</p>
		<p class="text-2xl font-bold text-brand">{formatPrice(depositAmount, currency)}</p>
	</div>

	<div class="space-y-3">
		<h4 class="text-sm font-semibold text-lavender-700">Реквизиты для оплаты:</h4>

		<div class="bg-white rounded-xl p-4 space-y-2 text-sm">
			<div class="flex justify-between">
				<span class="text-lavender-500">Revolut</span>
				<span class="font-mono text-lavender-900">@libertybureau</span>
			</div>
			<div class="flex justify-between">
				<span class="text-lavender-500">Bank of Cyprus</span>
				<span class="font-mono text-lavender-900">CY12 3456 7890 ...</span>
			</div>
		</div>
	</div>

	<div class="text-xs text-lavender-400 space-y-1">
		<p>1. Переведите депозит по указанным реквизитам</p>
		<p>2. Укажите номер брони в комментарии к платежу</p>
		<p>3. Мы подтвердим бронь в течение 24 часов</p>
	</div>
</div>
