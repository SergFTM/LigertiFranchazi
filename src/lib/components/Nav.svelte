<script lang="ts">
	let mobileOpen = $state(false);

	const links = [
		{ href: '/events', label: 'Ивенты' },
		{ href: '/map', label: 'Карта' },
		{ href: '/franchise', label: 'Франшиза' },
		{ href: '/corporate', label: 'Для бизнеса' }
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-lavender-100">
	<div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
		<a href="/" class="flex items-center gap-2">
			<span class="text-2xl font-display font-bold text-brand">Liberty</span>
			<span class="text-sm text-lavender-500 hidden sm:inline">Bureau</span>
		</a>

		<!-- Desktop -->
		<div class="hidden md:flex items-center gap-8">
			{#each links as link}
				<a href={link.href} class="text-sm font-medium text-lavender-700 hover:text-brand transition-colors">
					{link.label}
				</a>
			{/each}
			<a
				href="/dashboard/user"
				class="px-4 py-2 bg-brand text-white text-sm font-medium rounded-full hover:bg-lavender-700 transition-colors"
			>
				Кабинет
			</a>
		</div>

		<!-- Mobile hamburger -->
		<button
			class="md:hidden p-2 text-lavender-700"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Меню"
		>
			<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				{#if mobileOpen}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-white border-t border-lavender-100 px-4 py-4 space-y-3">
			{#each links as link}
				<a
					href={link.href}
					class="block text-base font-medium text-lavender-700 hover:text-brand py-2"
					onclick={() => (mobileOpen = false)}
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/dashboard/user"
				class="block text-center px-4 py-2 bg-brand text-white font-medium rounded-full"
				onclick={() => (mobileOpen = false)}
			>
				Кабинет
			</a>
		</div>
	{/if}
</nav>
