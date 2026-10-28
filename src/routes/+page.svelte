<script lang="ts">
	import { locale, t } from '#lib/i18n/index.js';
	import LanguageSwitch from '#lib/components/LanguageSwitch.svelte';
	import PortugueseAbout from '../content/pt-BR/about-me.md';
	import { page } from '$app/state';
	import type { ComponentType } from 'svelte';
	import type { Post } from '#lib/types.js';
	import { formatDate } from '#lib/utils.js';
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
	import { DATA } from '#lib/data/resume.js';

	const entries = Object.entries(
		import.meta.glob<{ default: ComponentType; metadata: Omit<Post, 'slug'> }>(
			'/src/content/*.md',
			{ eager: true }
		)
	)
		.map(([path, post]) => ({
			...post.metadata,
			content: post.default,
			slug: path.split('/').at(-1)!.replace(/\.md$/, '')
		}))
		.filter((post) => post.published)
		.sort((a, b) => b.date.localeCompare(a.date));
	const sections = ['overview', 'about', 'experience', 'learning', 'contact'];
	const learningSections: Record<string, string> = {
		education: 'Education',
		certifications: 'Certifications',
		courses: 'Courses'
	};
	const hash = $derived(page.url.hash.slice(1));
	const entry = $derived(entries.find((post) => hash === 'journal/' + post.slug));
	const section = $derived(
		hash === 'journal' || entry
			? 'journal'
			: Object.hasOwn(learningSections, hash)
				? 'learning'
				: sections.includes(hash)
					? hash
					: 'overview'
	);
	const filename = $derived(entry ? entry.slug + '.md' : $t(section) + '.md');
	$effect(() => {
		if (Object.hasOwn(learningSections, hash)) learning = learningSections[hash];
	});
	const shortcuts = [
		{ label: 'GitHub', href: DATA.contact.social.GitHub.url, icon: Github, external: true },
		{ label: 'LinkedIn', href: DATA.contact.social.LinkedIn.url, icon: Linkedin, external: true },
		{ label: 'Email', href: DATA.contact.social.Mail.url, icon: Mail, external: false },
		{ label: 'Journal', href: '#journal', icon: NotebookPen, external: false },
		{ label: 'Education', href: '#education', icon: GraduationCap, external: false },
		{ label: 'Certifications', href: '#certifications', icon: Award, external: false },
		{ label: 'Courses', href: '#courses', icon: BookOpen, external: false }
	];
	let expanded = $state(true);
	let learning = $state('Education');
	let copyStatus = $state('');
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
	<meta name="description" content={$t(DATA.description)} />
	<meta property="og:title" content={'Pedro Kielblock — ' + $t('Software Developer')} />
	<meta property="og:description" content={$t(DATA.description)} />
	<meta property="og:url" content={DATA.url} />
	<meta property="og:image" content={DATA.img} />
</svelte:head>

<main id="main" class="desktop" class:expanded>
	<div class="workspace-launch" aria-hidden="true">
		<Terminal size={18} />
		<div>
			<p class="launch-prompt">pedro@kielblockdev:~$</p>
			<p>
				<span class="launch-command" style:--command-width={$locale === 'pt-BR' ? '18ch' : '16ch'}
					>open {$t('overview')}.md</span
				><span class="launch-cursor">_</span>
			</p>
		</div>
	</div>
	<section class="terminal-window" aria-label={$t('Pedro Kielblock portfolio')}>
		<header class="window-bar">
			<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
			<span class="window-title"><Terminal size={16} /> pedro@kielblock.dev: ~</span>
			<div class="window-controls">
				<LanguageSwitch /><button
					class="icon-button"
					onclick={() => (expanded = !expanded)}
					aria-label={expanded ? $t('Restore window') : $t('Expand window')}
					aria-pressed={expanded}
					>{#if expanded}<Minimize2 size={16} />{:else}<Maximize2 size={16} />{/if}</button
				>
			</div>
		</header>
		<div class="window-body">
			<aside class="explorer">
				<p class="explorer-label">{$t('EXPLORER')}</p>
				<details class="explorer-folder" open>
					<summary class="folder"
						><ChevronRight size={15} /><FolderOpen size={17} /> ~/pedro</summary
					>
					<nav aria-label={$t('Portfolio sections')}>
						{#each sections as item, i}
							<a
								href={'#' + item}
								class:selected={section === item}
								aria-current={section === item ? 'page' : undefined}
								><span class="file-number" aria-hidden="true">0{i + 1}</span><FileText
									size={15}
								/><span>{$t(item)}<span class="file-extension">.md</span></span></a
							>
						{/each}
					</nav>
				</details>
				<details class="explorer-folder" open>
					<summary class="folder"
						><ChevronRight size={15} /><FolderOpen size={17} /> {$t('journal')}</summary
					>
					<nav aria-label={$t('Journal entries')}>
						{#each entries as post}
							<a
								href={'#journal/' + post.slug}
								class:selected={entry === post}
								aria-current={entry === post ? 'page' : undefined}
								title={$t(post.title)}
							>
								<FileText size={15} /><span>{post.slug}<span class="file-extension">.md</span></span
								>
							</a>
						{:else}<p class="muted journal-empty">{$t('No entries yet.')}</p>{/each}
					</nav>
				</details>
				<div class="explorer-bottom">
					{$t('Always curious.')}<br /><span class="muted">{$t('Based in Brazil.')}</span>
				</div>
			</aside>
			<div class="document">
				<div class="document-tab">
					<span><FileText size={15} /> {filename}</span>
				</div>
				<!-- The scroll pane needs keyboard access. -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div
					role="region"
					class="document-content"
					id="document-content"
					tabindex="0"
					aria-label={$t(entry?.title ?? section) + ' ' + $t('content')}
				>
					{#key filename}
						<div class="document-inner" class:overview={section === 'overview'}>
							<p class="breadcrumb">
								~ / {section === 'journal' ? 'journal' : 'pedro'} / <span>{filename}</span>
							</p>
							{#if section === 'journal'}
								{#if entry}
									<h1>{$t(entry.title)}</h1>
									<p class="muted">{formatDate(entry.date, 'medium', $locale)}</p>
									<article class="journal-content prose dark:prose-invert">
										{#if $locale === 'pt-BR' && entry.slug === 'about-me'}<PortugueseAbout
											/>{:else}<entry.content />{/if}
									</article>
								{:else}
									<h1><span class="accent">#</span> {$t('Journal')}</h1>
									{#each entries as post}<p class="body-copy">
											<a class="plain-link" href={'#journal/' + post.slug}>{post.slug}.md</a>
											<span class="muted">{formatDate(post.date, 'medium', $locale)}</span>
										</p>
									{:else}<p class="body-copy muted">{$t('No entries yet.')}</p>{/each}
								{/if}
							{:else if section === 'overview'}
								<pre
									class="ascii-wordmark full-wordmark"
									role="img"
									aria-label="kielblockdev">{" _    _      _ _     _            _       _\n| | _(_) ___| | |__ | | ___   ___| | ____| | _____   __\n| |/ / |/ _ \\ | '_ \\| |/ _ \\ / __| |/ / _` |/ _ \\ \\ / /\n|   <| |  __/ | |_) | | (_) | (__|   < (_| |  __/\\ V /\n|_|\\_\\_|\\___|_|_.__/|_|\\___/ \\___|_|\\_\\__,_|\\___| \\_/"}</pre>
								<pre
									class="ascii-wordmark compact-wordmark"
									role="img"
									aria-label="kielblockdev">{'+-------------+\n| kielblockdev |\n+-------------+'}</pre>
								<div class="identity">
									<img src={DATA.avatarUrl} alt="Pedro Kielblock" width="80" height="80" />
									<div>
										<h1>Pedro Kielblock</h1>
										<p>{$t(DATA.description)}</p>
										<p class="muted">Santo André, São Paulo, BR</p>
									</div>
								</div>
								<div class="personal-intro">
									<p>
										{$t(
											'At ReThinkingWorks, I build assessment platforms, portals, and dashboards. I especially enjoy the backend: designing APIs, working with databases, and getting different systems to work together.'
										)}
									</p>
									<p>
										{$t(
											'Outside work, I tinker with Linux, self-hosted services, and small tools for my own setup. I like understanding how things work and improving the things I use every day.'
										)}
									</p>
								</div>
								<div class="actions">
									<a class="primary-button" href="#experience"
										><BriefcaseBusiness size={18} /> {$t('Experience')}</a
									>
								</div>
								<nav class="shortcut-links" aria-label={$t('Profile links')}>
									{#each shortcuts as link}
										<a
											class="link-button"
											href={link.href}
											target={link.external ? '_blank' : undefined}
											rel={link.external ? 'noopener noreferrer' : undefined}
											><link.icon size={18} />{$t(link.label)}</a
										>
									{/each}
								</nav>
							{:else if section === 'about'}
								<h1><span class="accent">#</span> {$t('A little about me')}</h1>
								<div class="about-identity">
									<img src={DATA.avatarUrl} alt="Pedro Kielblock" width="80" height="80" />
									<p>Pedro Kielblock<br /><span class="muted">{$t(DATA.description)}</span></p>
								</div>
								<p class="body-copy">{$t(DATA.summary)}</p>
								<h2 class="section-heading">## {$t('My toolkit')}</h2>
								<div class="skills">
									{#each DATA.skills as skill}<span>{skill}</span>{/each}
								</div>
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
							{:else if section === 'experience'}
								<h1><span class="accent">#</span> {$t('Work experience')}</h1>
								<p class="body-copy muted">{$t('Open a role for the details.')}</p>
								{#each DATA.work as work, i}<details class="entry" open={i === 0}>
										<summary
											><span class="entry-date">{$t(work.start)} — {$t(work.end)}</span><span
												class="entry-title"
												>{$t(work.title)}<span class="muted">{work.company}</span></span
											><ChevronRight size={18} /></summary
										>
										<div class="entry-description">
											<p>{$t(work.description)}</p>
											<a
												class="plain-link"
												href={work.href}
												target="_blank"
												rel="noopener noreferrer">Visit company <ArrowUpRight size={16} /></a
											>
										</div>
									</details>{/each}
							{:else if section === 'learning'}
								<h1><span class="accent">#</span> {$t('Keep learning')}</h1>
								<div class="learning-tabs" role="group" aria-label={$t('Learning categories')}>
									{#each ['Education', 'Certifications', 'Courses'] as category}
										{@const LearningIcon =
											category === 'Education'
												? GraduationCap
												: category === 'Certifications'
													? Award
													: BookOpen}<button
											class:chosen={learning === category}
											aria-pressed={learning === category}
											onclick={() => (learning = category)}
											><LearningIcon size={18} />{category}</button
										>{/each}
								</div>
								{#if learning === 'Education'}{#each DATA.education as edu}<a
											class="learning-entry"
											href={edu.href}
											target="_blank"
											rel="noopener noreferrer"
											><span class="muted">{edu.start} — {edu.end}</span>
											<h2>{$t(edu.degree)}</h2>
											<p class="muted">{edu.school} <ArrowUpRight size={16} /></p></a
										>{/each}
								{:else if learning === 'Certifications'}{#each DATA.certificates as cert}<a
											class="learning-entry"
											href={cert.href}
											target="_blank"
											rel="noopener noreferrer"
										>
											<span class="muted">{cert.date}</span>
											<h2>{cert.name} <span class="accent">[{cert.score}]</span></h2>
											<p class="muted">
												{cert.issuer} · {$t('Score')}: {cert.score}
												<ArrowUpRight size={16} />
											</p>
										</a>{/each}
								{:else}{#each DATA.courses as course}<div class="learning-entry">
											<a
												href={$locale === 'pt-BR' ? course.hrefPt : course.href}
												target="_blank"
												rel="noopener noreferrer"
											>
												<span class="muted">{course.date} · {$t(course.duration)}</span>
												<h2>{$t(course.name)} <ArrowUpRight size={16} /></h2>
												<p class="muted">{course.provider} · {$t('Certificate (PDF)')}</p></a
											>{#if course.courseUrl}<a
													class="plain-link course-link"
													href={course.courseUrl}
													target="_blank"
													rel="noopener noreferrer"
													>{$t('View course')} <ArrowUpRight size={16} /></a
												>{/if}
										</div>{/each}{/if}
							{:else}
								<h1><span class="accent">#</span> {$t('Contact')}</h1>
								<p class="body-copy">
									{$t('For project inquiries or questions, email me.')}
								</p>
								<div class="email-card">
									<Mail size={20} /><a href={DATA.contact.social.Mail.url}>{DATA.contact.email}</a
									><button
										class="icon-button"
										aria-label={$t('Copy email address')}
										onclick={copyEmail}><Copy size={17} /></button
									>
								</div>
								<p class="copy-status" role="status">{copyStatus ? $t(copyStatus) : ''}</p>
							{/if}
						</div>
					{/key}
				</div>
			</div>
		</div>
		<footer class="window-status">
			<span><span class="status-dot"></span> {$t('portfolio')} / {$t(section)}</span>
			<span
				>© {new Date().getFullYear()} Pedro Kielblock ·
				<a href="/privacy">{$t('Privacy')}</a></span
			>
			<span>UTF-8 <span class="status-separator">│</span> Markdown</span>
		</footer>
	</section>
</main>
