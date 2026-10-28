<script>
	import '../app.css';
	import { page } from '$app/state';
</script>

<a class="skip-link" href="#main">Skip to content</a>
{#if page.url.pathname !== '/'}
	<header class="inner-header">
		<a href="/" class="accent">[pk] ~/pedro</a>
		<nav aria-label="Main navigation">
			<a href="/#about">About</a><a href="/#experience">Experience</a><a href="/blog">Journal</a>
		</nav>
	</header>
{/if}
<div
	class:inner-page={page.url.pathname !== '/'}
	id={page.url.pathname !== '/' ? 'main' : undefined}
>
	<slot />
</div>
{#if page.url.pathname !== '/'}
	<footer class="site-footer">
		<span>© {new Date().getFullYear()} Pedro Kielblock</span>
	</footer>
{/if}
