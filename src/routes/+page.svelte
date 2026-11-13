<script lang="ts">
	import { locale, t } from '#lib/i18n/index.js';
	import Prompt from '#lib/components/Prompt.svelte';
	import PortugueseAbout from '../content/pt-BR/about-me.md';
	import { page } from '$app/state';
	import type { ComponentType } from 'svelte';
	import type { Post } from '#lib/types.js';
	import { formatDate } from '#lib/utils.js';
	import { learningCategories, sectionOf } from '#lib/sections.js';
	import {
		ArrowUpRight,
		Award,
		BookOpen,
		ChevronRight,
		Copy,
		FileText,
		Folder,
		Github,
		GraduationCap,
		Linkedin,
		Mail
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
	const learningLabels: Record<string, string> = {
		education: 'Education',
		certifications: 'Certifications',
		courses: 'Courses'
	};
	const ansi = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
	const icon = { size: 16, strokeWidth: 1.75 };
	const external = { target: '_blank', rel: 'noopener noreferrer' };
	const { GitHub, LinkedIn, Mail: Email } = DATA.contact.social;

	const hash = $derived(page.url.hash.slice(1));
	const section = $derived(sectionOf(hash));
	const entry = $derived(entries.find((post) => hash === 'journal/' + post.slug));
	let learning = $state('education');
	let copyStatus = $state('');
	// The opening sequence plays on the section the visit starts on, once.
	let boot = $state(true);
	let opened: string | undefined;
	$effect(() => {
		if (learningCategories.includes(hash)) learning = hash;
		document.getElementById('screen')?.scrollTo(0, 0);
		if (opened === undefined) opened = hash;
		else if (hash !== opened) boot = false;
	});
	const command = $derived(
		section === 'overview'
			? 'fastfetch'
			: section === 'journal'
				? entry
					? `cat ${$t('journal')}/${entry.slug}.md`
					: `ls -l ${$t('journal')}`
				: section === 'learning'
					? `cat ${$t('learning')}/${$t(learningLabels[learning]).toLowerCase()}.md`
					: `cat ${$t(section)}.md`
	);
	const links = $derived([
		{ name: 'github', href: GitHub.url, icon: Github },
		{ name: 'linkedin', href: LinkedIn.url, icon: Linkedin },
		{ name: $t('Email').toLowerCase(), href: Email.url, icon: Mail },
		{ name: $t('journal') + '/', href: '#journal', icon: Folder },
		{ name: $t('Education').toLowerCase() + '.md', href: '#education', icon: GraduationCap },
		{ name: $t('Certifications').toLowerCase() + '.md', href: '#certifications', icon: Award },
		{ name: $t('Courses').toLowerCase() + '.md', href: '#courses', icon: BookOpen }
	]);
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(DATA.contact.email);
			copyStatus = 'Email copied.';
		} catch {
			copyStatus = 'Copy unavailable. Use the email link.';
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

{#key entry?.slug ?? section}
	<div class="output" class:boot style:--n={command.length}>
		<Prompt {command} typed={boot} />
		{#if section === 'overview'}
			<div class="result fetch">
				<img src={DATA.avatarUrl} alt="Pedro Kielblock" width="168" height="168" />
				<div>
					<p aria-hidden="true">
						<span class="accent">pedro</span>@<span class="accent">kielblockdev</span>
					</p>
					<p class="k-muted" aria-hidden="true">------------------</p>
					<dl>
						<dt>{$t('Name')}</dt>
						<dd><h1>{DATA.name}</h1></dd>
						<dt>{$t('Role')}</dt>
						<dd>{$t(DATA.description)}</dd>
						<dt>{$t('Location')}</dt>
						<dd>Santo André, São Paulo, BR</dd>
						<dt>{$t('Company')}</dt>
						<dd><a href={DATA.work[0].href} {...external}>{DATA.work[0].company}</a></dd>
						<dt>{$t('Toolkit')}</dt>
						<dd>{DATA.skills.join(' · ')}</dd>
					</dl>
					<div class="palette" aria-hidden="true">
						{#each ['', 'bright-'] as tone}
							<div>
								{#each ansi as color}<i style:background={`var(--ansi-${tone}${color})`}></i>{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
			<Prompt command="cat README.md" />
			<div class="result doc">
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
			<Prompt command="ls" />
			<nav class="result rows" aria-label={$t('Profile links')}>
				{#each links as link}
					<a class="k-row" href={link.href} {...link.href.startsWith('http') ? external : {}}>
						<link.icon {...icon} /><span>{link.name}</span>
						{#if link.href.startsWith('http')}<ArrowUpRight {...icon} />{/if}
					</a>
				{/each}
			</nav>
		{:else if section === 'about'}
			<div class="result doc">
				<h1><span class="accent" aria-hidden="true">#</span> {$t('A little about me')}</h1>
				<p>{$t(DATA.summary)}</p>
				<h2><span class="accent" aria-hidden="true">##</span> {$t('My toolkit')}</h2>
				<p>{DATA.skills.join(' · ')}</p>
				<p class="inline-links">
					<a href={GitHub.url} {...external}>GitHub <ArrowUpRight {...icon} /></a>
					<a href={LinkedIn.url} {...external}>LinkedIn <ArrowUpRight {...icon} /></a>
				</p>
			</div>
		{:else if section === 'experience'}
			<div class="result doc">
				<h1><span class="accent" aria-hidden="true">#</span> {$t('Work experience')}</h1>
				<p class="k-muted">{$t('Open a role for the details.')}</p>
				{#each DATA.work as work, i}
					<details class="entry" open={i === 0}>
						<summary>
							<ChevronRight {...icon} />
							<span>
								{$t(work.title)}
								<span class="k-muted">{work.company} · {$t(work.start)} – {$t(work.end)}</span>
							</span>
						</summary>
						<div class="entry-body">
							<p>{$t(work.description)}</p>
							<a href={work.href} {...external}>{$t('Visit company')} <ArrowUpRight {...icon} /></a>
						</div>
					</details>
				{/each}
			</div>
		{:else if section === 'learning'}
			<div class="result doc">
				<h1><span class="accent" aria-hidden="true">#</span> {$t('Keep learning')}</h1>
				<div class="k-seg" role="group" aria-label={$t('Learning categories')}>
					{#each learningCategories as category}
						<button
							type="button"
							aria-pressed={learning === category}
							onclick={() => (learning = category)}>{$t(learningLabels[category])}</button
						>
					{/each}
				</div>
				<div class="rows">
					{#if learning === 'education'}
						{#each DATA.education as edu}
							<a class="k-row" href={edu.href} {...external}>
								<span class="k-row__text">
									<span>{$t(edu.degree)}</span><span class="k-muted">{edu.school}</span>
								</span>
								<span class="row-meta">{edu.start}–{edu.end}</span>
							</a>
						{/each}
					{:else if learning === 'certifications'}
						{#each DATA.certificates as cert}
							<a class="k-row" href={cert.href} {...external}>
								<span class="k-row__text">
									<span>{cert.name}</span>
									<span class="k-muted">{cert.issuer} · {$t('Score')}: {cert.score}</span>
								</span>
								<span class="row-meta">{cert.date}</span>
							</a>
						{/each}
					{:else}
						{#each DATA.courses as course}
							<div class="k-row">
								<span class="k-row__text">
									<a href={$locale === 'pt-BR' ? course.hrefPt : course.href} {...external}
										>{$t(course.name)} <ArrowUpRight {...icon} /></a
									>
									<span class="k-muted"
										>{course.provider} · {$t(course.duration)} · {$t('Certificate (PDF)')}</span
									>
									{#if course.courseUrl}
										<a href={course.courseUrl} {...external}
											>{$t('View course')} <ArrowUpRight {...icon} /></a
										>
									{/if}
								</span>
								<span class="row-meta">{course.date}</span>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{:else if section === 'journal'}
			<div class="result doc">
				{#if entry}
					<h1><span class="accent" aria-hidden="true">#</span> {$t(entry.title)}</h1>
					<p class="k-muted">{formatDate(entry.date, 'medium', $locale)}</p>
					<article class="journal-content">
						{#if $locale === 'pt-BR' && entry.slug === 'about-me'}<PortugueseAbout
							/>{:else}<entry.content />{/if}
					</article>
				{:else}
					<h1><span class="accent" aria-hidden="true">#</span> {$t('Journal')}</h1>
					<div class="rows">
						{#each entries as post}
							<a class="k-row" href={'#journal/' + post.slug}>
								<FileText {...icon} /><span class="k-row__text">{post.slug}.md</span>
								<span class="row-meta">{formatDate(post.date, 'medium', $locale)}</span>
							</a>
						{:else}<p class="k-row k-muted">{$t('No entries yet.')}</p>{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div class="result doc">
				<h1><span class="accent" aria-hidden="true">#</span> {$t('Contact')}</h1>
				<p>{$t('For project inquiries or questions, email me.')}</p>
				<p class="email">
					<Mail {...icon} /><a href={Email.url}>{DATA.contact.email}</a><button
						class="k-btn k-btn--ghost k-btn--sm k-btn--icon"
						aria-label={$t('Copy email address')}
						onclick={copyEmail}><Copy {...icon} /></button
					>
				</p>
				<p class="k-muted" role="status">{copyStatus ? $t(copyStatus) : ''}</p>
			</div>
		{/if}
		<Prompt />
	</div>
{/key}
