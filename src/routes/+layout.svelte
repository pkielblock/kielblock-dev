<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Maximize2, Minimize2 } from 'lucide-svelte';
	import { locale, t, preferredLocale, languageKey } from '#lib/i18n/index.js';
	import { sections, sectionOf } from '#lib/sections.js';
	import LanguageSwitch from '#lib/components/LanguageSwitch.svelte';
	import '../kiel-ui.css';
	import '../app.css';

	let { children }: { children: Snippet } = $props();
	let expanded = $state(true);
	const current = $derived(page.url.pathname === '/' ? sectionOf(page.url.hash.slice(1)) : '');

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
	// A plain #screen link would be read as a section fragment and reopen the overview.
	function skipToContent(event: MouseEvent) {
		event.preventDefault();
		document.getElementById('screen')?.focus();
	}
</script>

<a class="skip-link" href="#screen" onclick={skipToContent}>{$t('Skip to content')}</a>
<main class="desktop" class:expanded>
	<section class="terminal-window" aria-label={$t('Pedro Kielblock portfolio')}>
		<header class="window-bar">
			<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
			<span class="window-title">pedro@kielblockdev: ~</span>
			<div class="window-controls">
				<LanguageSwitch /><button
					class="k-btn k-btn--ghost k-btn--sm k-btn--icon expand-button"
					onclick={() => (expanded = !expanded)}
					aria-label={expanded ? $t('Restore window') : $t('Expand window')}
					aria-pressed={expanded}
					>{#if expanded}<Minimize2 size={16} strokeWidth={1.75} />{:else}<Maximize2
							size={16}
							strokeWidth={1.75}
						/>{/if}</button
				>
			</div>
		</header>
		<nav class="window-tabs" aria-label={$t('Portfolio sections')}>
			{#each sections as item}
				<a href={'/#' + item} aria-current={current === item ? 'page' : undefined}>{$t(item)}</a>
			{/each}
		</nav>
		<!-- The scroll pane needs keyboard access. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div class="screen" id="screen" role="region" tabindex="0" aria-label={$t('Terminal output')}>
			{@render children()}
		</div>
		<footer class="window-footer">© {new Date().getFullYear()} Pedro Kielblock</footer>
	</section>
</main>
