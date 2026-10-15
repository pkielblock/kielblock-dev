<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { Home, UserRound, BriefcaseBusiness, NotebookPen, Github, Mail } from 'lucide-svelte';
</script>

<a class="skip-link" href="#main">Skip to content</a>
<div
	class:inner-page={$page.url.pathname !== '/'}
	id={$page.url.pathname !== '/' ? 'main' : undefined}
>
	<slot />
</div>
<nav class="floating-dock" aria-label="Main navigation">
	<a href="/" aria-label="Home" class:active={$page.url.pathname === '/'}
		><Home size={18} /><span>Home</span></a
	>
	<a href="/#about" aria-label="About"><UserRound size={18} /><span>About</span></a>
	<a href="/#experience" aria-label="Experience"
		><BriefcaseBusiness size={18} /><span>Experience</span></a
	>
	<a href="/blog" aria-label="Journal" class:active={$page.url.pathname.startsWith('/blog')}
		><NotebookPen size={18} /><span>Journal</span></a
	>
	<div class="dock-divider"></div>
	<a
		href="https://github.com/pkielblock"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="GitHub"><Github size={18} /><span>GitHub</span></a
	>
	<a href="mailto:pedro@kielblock.dev" aria-label="Email"><Mail size={18} /><span>Email</span></a>
</nav>
<footer class="site-footer">
	<span>Pedro Kielblock · <a href="/privacy">Privacy</a></span><span>Santo André, Brazil</span><span
		>© {new Date().getFullYear()}</span
	>
</footer>
