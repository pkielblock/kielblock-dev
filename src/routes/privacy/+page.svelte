<script lang="ts">
	import { locale, t } from '#lib/i18n/index.js';
	import policies from '#lib/i18n/privacy.json';
	const policy = $derived(policies[$locale]);
</script>

<svelte:head>
	<title>{$t('Privacy')} | Pedro Kielblock</title>
	<meta name="description" content={policy.description} />
</svelte:head>
<main class="privacy-page">
	<a href="/">{$t('Back to home')}</a>
	<h1>{policy.title}</h1>
	<p>{policy.draft}</p>
	<p><a href="mailto:pedro@kielblock.dev">pedro@kielblock.dev</a></p>
	{#each policy.sections as [title, paragraphs]}
		<h2>{title}</h2>
		{#each paragraphs as paragraph}<p>{paragraph}</p>{/each}
	{/each}
</main>

<style>
	.privacy-page {
		max-width: 760px;
		margin: 0 auto;
		padding: 4rem 1.5rem 8rem;
		line-height: 1.8;
	}
	h1 {
		font-size: 2.5rem;
		margin: 1.5rem 0;
	}
	h2 {
		font-size: 1.3rem;
		margin: 2rem 0 0.75rem;
	}
	p {
		margin: 1rem 0;
	}
	a {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
</style>
