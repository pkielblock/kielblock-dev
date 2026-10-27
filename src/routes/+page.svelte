<script lang="ts">
	import { page } from '$app/stores';
	import {
		ArrowUpRight,
		Award,
		BookOpen,
		BriefcaseBusiness,
		GraduationCap,
		NotebookPen,
		ChevronRight,
		Copy,
		FileText,
		FolderOpen,
		Github,
		Linkedin,
		Mail,
		Maximize2,
		Minimize2,
		Terminal
	} from 'lucide-svelte';
	import { DATA } from '$lib/data/resume';

	const sections = ['overview', 'about', 'experience', 'learning', 'contact'];
	const learningSections: Record<string, string> = {
		education: 'Education',
		certifications: 'Certifications',
		courses: 'Courses'
	};
	$: hash = $page.url.hash.slice(1);
	$: section = Object.hasOwn(learningSections, hash)
		? 'learning'
		: sections.includes(hash)
			? hash
			: 'overview';
	$: if (Object.hasOwn(learningSections, hash)) learning = learningSections[hash];
	const shortcuts = [
		{ label: 'GitHub', href: DATA.contact.social.GitHub.url, icon: Github, external: true },
		{ label: 'LinkedIn', href: DATA.contact.social.LinkedIn.url, icon: Linkedin, external: true },
		{ label: 'Email', href: DATA.contact.social.Mail.url, icon: Mail, external: false },
		{ label: 'Journal', href: '/blog', icon: NotebookPen, external: false },
		{ label: 'Education', href: '#education', icon: GraduationCap, external: false },
		{ label: 'Certifications', href: '#certifications', icon: Award, external: false },
		{ label: 'Courses', href: '#courses', icon: BookOpen, external: false }
	];
	let expanded = true;
	let learning = 'Education';
	let copyStatus = '';
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(DATA.contact.email);
			copyStatus = 'Email copied.';
		} catch {
			copyStatus = 'Copy unavailable. Use the email link below.';
		}
	}
</script>

<svelte:head>
	<title>pedro@kielblockdev</title>
	<meta name="description" content={DATA.description} />
	<meta property="og:title" content="Pedro Kielblock — Software Developer" />
	<meta property="og:description" content={DATA.description} />
	<meta property="og:url" content={DATA.url} />
	<meta property="og:image" content={DATA.img} />
</svelte:head>

<main id="main" class="desktop" class:expanded>
	<div class="workspace-launch" aria-hidden="true">
		<Terminal size={18} />
		<div>
			<p class="launch-prompt">pedro@kielblockdev:~$</p>
			<p>
				<span class="launch-command">open overview.md</span><span class="launch-cursor">_</span>
			</p>
		</div>
	</div>
	<div class="desktop-heading">
		<span><span class="accent">[pk]</span> personal workspace</span><a href="/blog"
			><NotebookPen size={16} /> Journal</a
		>
	</div>
	<section class="terminal-window" aria-label="Pedro Kielblock portfolio">
		<header class="window-bar">
			<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
			<span class="window-title"><Terminal size={16} /> pedro@kielblock.dev: ~</span>
			<button
				class="icon-button"
				on:click={() => (expanded = !expanded)}
				aria-label={expanded ? 'Restore window' : 'Expand window'}
				aria-pressed={expanded}
				>{#if expanded}<Minimize2 size={16} />{:else}<Maximize2 size={16} />{/if}</button
			>
		</header>
		<div class="window-body">
			<aside class="explorer">
				<p class="explorer-label">EXPLORER</p>
				<p class="folder"><FolderOpen size={17} /> ~/pedro</p>
				<nav aria-label="Portfolio sections">
					{#each sections as item, i}
						<a
							href={'#' + item}
							class:selected={section === item}
							aria-current={section === item ? 'page' : undefined}
							><span class="file-number" aria-hidden="true">0{i + 1}</span><FileText
								size={15}
							/><span>{item}<span class="file-extension">.md</span></span></a
						>
					{/each}
				</nav>
				<div class="explorer-bottom">
					<span class="status-dot"></span> Always curious.<br /><span class="muted"
						>Based in Brazil.</span
					>
				</div>
			</aside>
			<div class="document">
				<div class="document-tab">
					<span><FileText size={15} /> {section}.md</span><span class="accent" aria-hidden="true"
						>●</span
					>
				</div>
				<!-- The scroll pane needs keyboard access. -->
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<div
					role="region"
					class="document-content"
					id="document-content"
					tabindex="0"
					aria-label={section + ' content'}
				>
					{#key section}
						<div class="document-inner" class:overview={section === 'overview'}>
							<p class="breadcrumb">~ / pedro / <span>{section}.md</span></p>
							{#if section === 'overview'}
								<pre
									class="ascii-wordmark full-wordmark"
									role="img"
									aria-label="kielblockdev">{" _    _      _ _     _            _       _\n| | _(_) ___| | |__ | | ___   ___| | ____| | _____   __\n| |/ / |/ _ \\ | '_ \\| |/ _ \\ / __| |/ / _` |/ _ \\ \\ / /\n|   <| |  __/ | |_) | | (_) | (__|   < (_| |  __/\\ V /\n|_|\\_\\_|\\___|_|_.__/|_|\\___/ \\___|_|\\_\\__,_|\\___| \\_/"}</pre>
								<pre
									class="ascii-wordmark compact-wordmark"
									role="img"
									aria-label="kielblockdev">{'+-------------+\n| kielblockdev |\n+-------------+'}</pre>
								<div class="identity">
									<div>
										<p class="eyebrow">SOFTWARE DEVELOPER</p>
										<h1>Pedro Kielblock<span class="accent">_</span></h1>
										<p class="muted">Santo André, São Paulo, BR</p>
									</div>
								</div>
								<div class="personal-intro">
									<p>
										At ReThinkingWorks, I build assessment platforms, portals, and dashboards. I
										especially enjoy the backend: designing APIs, working with databases, and
										getting different systems to work together.
									</p>
									<p>
										Outside work, I tinker with Linux, self-hosted services, and small tools for my
										own setup. I like understanding how things work and improving the things I use
										every day.
									</p>
								</div>
								<div class="actions">
									<a class="primary-button" href="#experience"
										><BriefcaseBusiness size={18} /> Experience</a
									>
								</div>
								<nav class="shortcut-links" aria-label="Profile links">
									{#each shortcuts as link}
										<a
											class="link-button"
											href={link.href}
											target={link.external ? '_blank' : undefined}
											rel={link.external ? 'noopener noreferrer' : undefined}
											><svelte:component this={link.icon} size={18} />{link.label}</a
										>
									{/each}
								</nav>
							{:else if section === 'about'}
								<p class="comment">// the person behind the code</p>
								<h1><span class="accent">#</span> A little about me</h1>
								<div class="about-identity">
									<img src={DATA.avatarUrl} alt="Pedro Kielblock" width="80" height="80" />
									<p>Pedro Kielblock<br /><span class="muted">{DATA.description}</span></p>
								</div>
								<p class="body-copy">{DATA.summary}</p>
								<h2 class="section-heading">## My toolkit</h2>
								<div class="skills">
									{#each DATA.skills as skill}<span>{skill}</span>{/each}
								</div>
								<a
									class="link-button"
									href={DATA.contact.social.LinkedIn.url}
									target="_blank"
									rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a
								>
							{:else if section === 'experience'}
								<p class="comment">// things I've helped build</p>
								<h1><span class="accent">#</span> Work experience</h1>
								<p class="body-copy muted">Open a role for the details.</p>
								{#each DATA.work as work, i}<details class="entry" open={i === 0}>
										<summary
											><span class="entry-date">{work.start} — {work.end}</span><span
												class="entry-title"
												>{work.title}<span class="muted">{work.company}</span></span
											><ChevronRight size={18} /></summary
										>
										<div class="entry-description">
											<p>{work.description}</p>
											<a
												class="plain-link"
												href={work.href}
												target="_blank"
												rel="noopener noreferrer">Visit company <ArrowUpRight size={16} /></a
											>
										</div>
									</details>{/each}
							{:else if section === 'learning'}
								<p class="comment">// a work in progress, always</p>
								<h1><span class="accent">#</span> Keep learning</h1>
								<div class="learning-tabs" role="group" aria-label="Learning categories">
									{#each ['Education', 'Certifications', 'Courses'] as category}<button
											class:chosen={learning === category}
											aria-pressed={learning === category}
											on:click={() => (learning = category)}
											><svelte:component
												this={category === 'Education'
													? GraduationCap
													: category === 'Certifications'
														? Award
														: BookOpen}
												size={18}
											/>{category}</button
										>{/each}
								</div>
								{#if learning === 'Education'}{#each DATA.education as edu}<a
											class="learning-entry"
											href={edu.href}
											target="_blank"
											rel="noopener noreferrer"
											><span class="muted">{edu.start} — {edu.end}</span>
											<h2>{edu.degree}</h2>
											<p class="muted">{edu.school} <ArrowUpRight size={16} /></p></a
										>{/each}
								{:else if learning === 'Certifications'}{#each DATA.certificates as cert}<div
											class="learning-entry"
										>
											<span class="muted">{cert.date}</span>
											<h2>{cert.name} <span class="accent">[{cert.score}]</span></h2>
											<p class="muted">{cert.issuer} · Score: {cert.score}</p>
										</div>{/each}
								{:else}{#each DATA.courses as course}<div class="learning-entry">
											<span class="muted">{course.date} · {course.duration}</span>
											<h2>{course.name}</h2>
											<p class="muted">{course.provider}</p>
										</div>{/each}{/if}
							{:else}
								<p class="comment">// good things start with a conversation</p>
								<h1><span class="accent">#</span> Let's build something good.</h1>
								<p class="body-copy">
									Have an idea, a question, or something interesting to share? My inbox is open.
								</p>
								<div class="email-card">
									<Mail size={20} /><a href={DATA.contact.social.Mail.url}>{DATA.contact.email}</a
									><button class="icon-button" aria-label="Copy email address" on:click={copyEmail}
										><Copy size={17} /></button
									>
								</div>
								<p class="copy-status" role="status">{copyStatus}</p>
								<div class="social-links">
									<a
										class="link-button"
										href={DATA.contact.social.GitHub.url}
										target="_blank"
										rel="noopener noreferrer"
										><Github size={18} /> GitHub <ArrowUpRight size={16} /></a
									><a
										class="link-button"
										href={DATA.contact.social.LinkedIn.url}
										target="_blank"
										rel="noopener noreferrer"
										><Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} /></a
									>
								</div>
							{/if}
						</div>
					{/key}
				</div>
			</div>
		</div>
		<footer class="window-status">
			<span><span class="status-dot"></span> portfolio / {section}</span><span
				>UTF-8 <span class="status-separator">│</span> Markdown</span
			>
		</footer>
	</section>
	<div class="desktop-bottom">
		<span>Made of code & curiosity.</span><a
			href={DATA.contact.social.GitHub.url}
			target="_blank"
			rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /></a
		>
	</div>
</main>
