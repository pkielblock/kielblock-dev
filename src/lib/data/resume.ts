import { CodeIcon, Github, Globe, HomeIcon, NotebookIcon, Youtube } from 'lucide-svelte';
// Navbar Icons
import GithubSvg from '$lib/imgs/github.svg';
import GithubDarkSvg from '$lib/imgs/github-dark.svg';

import GmailSvg from '$lib/imgs/gmail.svg';
import GmailDarkSvg from '$lib/imgs/gmail-dark.svg';

import LinkedinSvg from '$lib/imgs/linkedin.svg';
import LinkedinDarkSvg from '$lib/imgs/linkedin-dark.svg';

import RtwImg from '$lib/imgs/rtw.svg';
import EtecImg from '$lib/imgs/etec.png';
import FatecImg from '$lib/imgs/fatec.png';
import CulturaInglesaImg from '$lib/imgs/cultura.png';

// Your resume data
export let DATA = {
	name: 'Pedro Kielblock',
	initials: 'PK',
	url: 'https://kielblock.dev',
	img: 'https://github.com/pkielblock.png',
	location: 'Santo André, São Paulo - Brazil',
	locationLink: 'https://www.google.com/maps/place/santo+andre',
	description: 'Backend-focused Software Developer',
	summary:
		"I'm a backend-focused software developer who enjoys building websites and tools that make life easier. Whether it's integrating APIs, making dashboards, or just tinkering with new ideas, I love solving problems and learning along the way. I work comfortably in both English and Portuguese.",
	avatarUrl: 'https://github.com/pkielblock.png',
	skills: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'PostgreSQL', 'PowerBI'],
	navbar: [
		{ href: '/', icon: HomeIcon, label: 'Home' },
		{ href: '/blog', icon: NotebookIcon, label: 'Blog' }
		/*
		{
			href: 'https://github.com/pkielblock?tab=repositories', // GitHub repos
			icon: CodeIcon,
			label: 'Projects',
			target: '_blank',
			rel: 'noopener noreferrer'
		}
		*/
	],
	contact: {
		email: 'pedro@kielblock.dev',
		tel: '+55 11 99718-3394',
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/pkielblock',
				icon: GithubSvg,
				navbar: true,
				dark_icon: GithubDarkSvg,
				target: '_blank',
				rel: 'noopener noreferrer'
			},
			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/pedrokielblock/',
				icon: LinkedinSvg,
				navbar: true,
				dark_icon: LinkedinDarkSvg,
				target: '_blank',
				rel: 'noopener noreferrer'
			},
			Mail: {
				name: 'Email',
				url: 'mailto:pedro@kielblock.dev',
				icon: GmailSvg,
				navbar: true,
				dark_icon: GmailDarkSvg,
				target: '_blank',
				rel: 'noopener noreferrer'
			}
		}
	},
	work: [
		{
			company: 'ReThinkingWorks',
			href: 'https://rethinkingworks.com',
			badges: [],
			location: 'Santo André, SP',
			title: 'Systems Analyst',
			logoUrl: RtwImg,
			start: 'Jan 2024',
			end: 'Present',
			description:
				'Developed solutions using monday.com, Pipefy, and FuseBase. Integrated REST APIs within company systems. Created dashboards with PowerBI and Fabric. Continuous development and maintenance of company website, blog, and newsletter. Wrote and communicated regularly in English.'
		},
		{
			company: 'ReThinkingWorks',
			href: 'https://rethinkingworks.com',
			badges: [],
			location: 'Santo André, SP',
			title: 'Intern',
			logoUrl: RtwImg,
			start: 'Jul 2022',
			end: 'Dec 2023',
			description:
				'Developed solutions using monday.com, Pipefy, and FuseBase. Continuous development and maintenance of company website, blog, and newsletter. Wrote and communicated regularly in English.'
		}
	],
	education: [
		{
			school: 'FATEC São Caetano do Sul - Antonio Russo',
			href: 'https://fatecscl.edu.br',
			degree: 'Technologist in Systems Analysis and Development',
			logoUrl: FatecImg,
			start: '2023',
			end: '2023',
			description:
				'Completed a technologist program focused on systems analysis and software development. Developed expertise in analyzing complex systems, designing solutions, and implementing software projects with practical industry applications.'
		},
		{
			school: 'ETEC Lauro Gomes',
			href: 'https://www.etec.sp.gov.br',
			degree: 'Technical Degree in Systems Development',
			logoUrl: EtecImg,
			start: '2019',
			end: '2019',
			description:
				'Completed a technical education program emphasizing practical systems development skills. Gained foundational knowledge in software development, database design, and IT infrastructure.'
		},
		{
			school: 'Cultura Inglesa',
			href: 'https://www.culturainglesa.com.br',
			degree: 'English as a Second Language',
			logoUrl: CulturaInglesaImg,
			start: '2013',
			end: '2021',
			description:
				'Completed the entire English language course to improve my communication skills.'
		}
	],
	certificates: [
		{
			name: 'Cambridge Assessment English - C2 Proficiency',
			score: '202',
			issuer: 'Cambridge Assessment English',
			date: '2024',
			showScore: true
		},
		{
			name: 'ETS - TOEIC',
			score: '925',
			issuer: 'ETS',
			date: '2023',
			showScore: true
		},
		{
			name: 'Cambridge Assessment English - C1 Advanced',
			score: '185',
			issuer: 'Cambridge Assessment English',
			date: '2021',
			showScore: true
		},
		{
			name: 'Cambridge Assessment English - B2 First',
			score: '163',
			issuer: 'Cambridge Assessment English',
			date: '2018',
			showScore: true
		}
	],
	courses: [
		{
			name: 'Complete Java Course - REST API/Spring Boot/OOP/JPA',
			duration: '54.5 hours',
			provider: 'Udemy',
			date: '2023'
		},
		{
			name: 'Extension: Internet of Things and Smart Environments',
			duration: '',
			provider: 'FATEC',
			date: '2021'
		}
	]
};
