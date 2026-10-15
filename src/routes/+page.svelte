<script lang="ts">
	import {
		ArrowUpRight,
		ArrowDown,
		Github,
		Linkedin,
		ArrowRight,
		Pause,
		Play
	} from 'lucide-svelte';
	import { DATA } from '$lib/data/resume';
	import Starfield from '$lib/components/portfolio/Starfield.svelte';
	let paused = false;
	let activeTab = 'Education';
	function magnetic(node: HTMLElement) {
		const move = (e: PointerEvent) => {
			if (matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
			const rect = node.getBoundingClientRect();
			node.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.12}px, ${(e.clientY - rect.top - rect.height / 2) * 0.18}px)`;
		};
		const reset = () => {
			node.style.transform = '';
		};
		node.addEventListener('pointermove', move);
		node.addEventListener('pointerleave', reset);
		return {
			destroy() {
				node.removeEventListener('pointermove', move);
				node.removeEventListener('pointerleave', reset);
			}
		};
	}
</script>

<svelte:head>
	<title>Pedro Kielblock — Developer. Explorer. Builder.</title>
	<meta name="description" content={DATA.description} />
	<meta property="og:title" content="Pedro Kielblock — Developer. Explorer. Builder." />
	<meta property="og:description" content={DATA.description} />
	<meta property="og:url" content={DATA.url} />
	<meta property="og:image" content={DATA.img} />
</svelte:head>

<main id="main" class="portfolio-page" class:motion-paused={paused}>
	<Starfield {paused} />
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero-content">
			<p class="hero-intro">Software developer, endlessly curious.</p>
			<h1 id="hero-title">Pedro<br />Kielblock<span class="accent">.</span></h1>
			<div class="hero-description">
				<p>
					Backend-focused. Building tools, connecting systems,<br />and following ideas a little
					further.
				</p>
			</div>
			<div class="hero-actions">
				<a class="button primary" href="#experience" use:magnetic
					>My experience <ArrowUpRight size={17} /></a
				><a
					class="text-link"
					href={DATA.contact.social.GitHub.url}
					target="_blank"
					rel="noopener noreferrer">GitHub <ArrowUpRight size={15} /></a
				>
			</div>
		</div>
		<div class="hero-bottom">
			<a href="#about" class="scroll-link"
				><span class="scroll-icon"><ArrowDown size={14} /></span> Explore</a
			><button
				class="motion-button"
				on:click={() => (paused = !paused)}
				aria-label={paused ? 'Play animations' : 'Pause animations'}
				aria-pressed={paused}
				>{#if paused}<Play size={12} />{:else}<Pause size={12} />{/if} Motion {paused
					? 'off'
					: 'on'}</button
			>
		</div>
	</section>

	<section id="about" class="section about-section">
		<div class="about-grid">
			<div class="about-heading">
				<h2>About me</h2>
				<div class="portrait-tag">
					<a
						class="portrait-link"
						href={DATA.contact.social.GitHub.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit Pedro Kielblock on GitHub"
						><img src={DATA.avatarUrl} alt="Pedro Kielblock" width="96" height="96" /></a
					>
					<div><strong>Pedro Kielblock</strong><span>Santo André, São Paulo, BR</span></div>
				</div>
			</div>
			<div class="about-copy">
				<p>{DATA.summary}</p>
				<a
					class="text-link"
					href={DATA.contact.social.LinkedIn.url}
					target="_blank"
					rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /></a
				>
			</div>
		</div>
		<div class="skills" aria-label="Skills">
			{#each DATA.skills as skill}<span>{skill}</span>{/each}
		</div>
	</section>

	<section id="experience" class="section experience-section">
		<div class="section-title">
			<h2>Experience</h2>
		</div>
		<div class="timeline">
			{#each DATA.work as work, i}<details class="work-row" open={i === 0}>
					<summary
						><span class="work-date">{work.start} — {work.end}</span>
						<div>
							<span class="company"
								>{work.company}{#if i === 0}<span class="current-tag">Current</span>{/if}</span
							>
							<h3>{work.title}</h3>
						</div>
						<span class="expand-icon">+</span></summary
					>
					<div class="work-description">
						<p>{work.description}</p>
						<a class="text-link" href={work.href} target="_blank" rel="noopener noreferrer"
							>Visit company <ArrowUpRight size={14} /></a
						>
					</div>
				</details>{/each}
		</div>
	</section>

	<section class="section learning-section" id="learning">
		<div class="section-title">
			<h2>Always learning</h2>
			<div class="learning-tabs" role="group" aria-label="Learning categories">
				{#each ['Education', 'Certifications', 'Courses'] as tab}<button
						class:chosen={activeTab === tab}
						aria-pressed={activeTab === tab}
						on:click={() => (activeTab = tab)}>{tab}</button
					>{/each}
			</div>
		</div>
		<div class="learning-list">
			{#if activeTab === 'Education'}{#each DATA.education as edu}<a
						class="learning-row"
						href={edu.href}
						target="_blank"
						rel="noopener noreferrer"
						><span class="learning-year">{edu.start} — {edu.end}</span>
						<div>
							<h3>{edu.school}</h3>
							<p>{edu.degree}</p>
						</div>
						<ArrowUpRight size={20} /></a
					>{/each}{:else if activeTab === 'Certifications'}{#each DATA.certificates as cert}<div
						class="learning-row"
					>
						<span class="learning-year">{cert.date}</span>
						<div>
							<h3>{cert.name}</h3>
							<p>{cert.issuer}</p>
						</div>
						<span class="score">{cert.score}<small>Score</small></span>
					</div>{/each}{:else}{#each DATA.courses as course}<div class="learning-row">
						<span class="learning-year">{course.date}</span>
						<div>
							<h3>{course.name}</h3>
							<p>{course.provider}</p>
						</div>
						<span class="learning-year">{course.duration}</span>
					</div>{/each}{/if}
		</div>
	</section>

	<section id="contact" class="contact-section">
		<h2>Let’s build<br />something good.</h2>
		<a class="contact-cta" href={DATA.contact.social.Mail.url} use:magnetic
			>Say hello <ArrowUpRight /></a
		>
		<div class="contact-bottom">
			<a href={DATA.contact.social.Mail.url}>{DATA.contact.email} <ArrowRight size={15} /></a>
			<div>
				<a
					href={DATA.contact.social.GitHub.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"><Github size={20} /></a
				><a
					href={DATA.contact.social.LinkedIn.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"><Linkedin size={20} /></a
				>
			</div>
		</div>
	</section>
</main>
