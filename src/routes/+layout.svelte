<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<a class="skip-link" href="#main">Skip to content</a>
{#if $page.url.pathname !== '/'}
	<header class="inner-header">
		<a href="/" class="accent">[pk] ~/pedro</a>
		<nav aria-label="Main navigation">
			<a href="/#about">About</a><a href="/#experience">Experience</a><a href="/blog">Journal</a>
		</nav>
	</header>
{/if}
<div
	class:inner-page={$page.url.pathname !== '/'}
	id={$page.url.pathname !== '/' ? 'main' : undefined}
>
	<slot />
</div>
<footer class="site-footer">
	<span>© {new Date().getFullYear()} Pedro Kielblock</span><a href="/privacy">Privacy & cookies</a>
</footer>
