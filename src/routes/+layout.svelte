<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	import { onMount } from 'svelte';
	import { locale, t, preferredLocale, languageKey } from '#lib/i18n/index.js';
	import LanguageSwitch from '#lib/components/LanguageSwitch.svelte';
	import '../app.css';
	import { page } from '$app/state';

	onMount(() => {
		let saved = null;
		try {
			saved = localStorage.getItem(languageKey);
		} catch {
			/* Browser storage is optional. */
		}
		locale.set(preferredLocale(saved, navigator.languages));
	});
	$effect(() => {
		document.documentElement.lang = $locale;
	});
</script>

<a class="skip-link" href="#main">{$t('Skip to content')}</a>
{#if page.url.pathname !== '/'}
	<header class="inner-header">
		<a href="/" class="accent">[pk] ~/pedro</a>
		<nav aria-label={$t('Main navigation')}>
			<a href="/#about">{$t('About')}</a><a href="/#experience">{$t('Experience')}</a><a
				href="/blog">{$t('Journal')}</a
			>
		</nav>
		<LanguageSwitch />
	</header>
{/if}
<div
	class:inner-page={page.url.pathname !== '/'}
	id={page.url.pathname !== '/' ? 'main' : undefined}
>
	{@render children()}
</div>
{#if page.url.pathname !== '/'}
	<footer class="site-footer">
		<span>© {new Date().getFullYear()} Pedro Kielblock</span><a href="/privacy">{$t('Privacy')}</a>
	</footer>
{/if}
