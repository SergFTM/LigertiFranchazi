<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AiWidget from '$lib/components/AiWidget.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Liberty Bureau — Творческие ивенты</title>
	<meta name="description" content="Международная сеть творческих мастер-классов. Керамика, парфюмерия, флористика и многое другое." />
</svelte:head>

<Nav />
<main class="pt-16 min-h-screen">
	{@render children()}
</main>
<Footer />
<AiWidget />
