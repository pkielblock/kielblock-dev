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
				'Completed the entire English language course to improve my communication skills..'
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
	],
	projects: [
		{
			title: 'Chat Collect',
			href: 'https://chatcollect.com',
			dates: 'Jan 2024 - Feb 2024',
			active: true,
			description:
				'With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Stripe',
				'Shadcn UI',
				'Magic UI'
			],
			links: [
				{
					type: 'Website',
					href: 'https://chatcollect.com',
					// icon: <Icons.globe className="size-3" />,
					icon: Globe
				}
			],
			image: '',
			video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4'
		},
		{
			title: 'Magic UI',
			href: 'https://magicui.design',
			dates: 'June 2023 - Present',
			active: true,
			description: 'Designed, developed and sold animated UI components for developers.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Stripe',
				'Shadcn UI',
				'Magic UI'
			],
			links: [
				{
					type: 'Website',
					href: 'https://magicui.design',
					// icon: <Icons.globe className="size-3" />,
					icon: Globe
				},
				{
					type: 'Source',
					href: 'https://github.com/magicuidesign/magicui',
					icon: Github
					// icon: <Icons.github className="size-3" />,
				}
			],
			image: '',
			video: 'https://cdn.magicui.design/bento-grid.mp4'
		},
		{
			title: 'llm.report',
			href: 'https://llm.report',
			dates: 'April 2023 - September 2023',
			active: true,
			description:
				'Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Shadcn UI',
				'Magic UI',
				'Stripe',
				'Cloudflare Workers'
			],
			links: [
				{
					type: 'Website',
					href: 'https://llm.report',
					icon: Globe
					// icon: <Icons.globe className="size-3" />,
				},
				{
					type: 'Source',
					href: 'https://github.com/dillionverma/llm.report',
					icon: Github
					// icon: <Icons.github className="size-3" />,
				}
			],
			image: '',
			video: 'https://cdn.llm.report/openai-demo.mp4'
		},
		{
			title: 'Automatic Chat',
			href: 'https://automatic.chat',
			dates: 'April 2023 - March 2024',
			active: true,
			description:
				'Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.',
			technologies: [
				'Next.js',
				'Typescript',
				'PostgreSQL',
				'Prisma',
				'TailwindCSS',
				'Shadcn UI',
				'Magic UI',
				'Stripe',
				'Cloudflare Workers'
			],
			links: [
				{
					type: 'Website',
					href: 'https://automatic.chat',
					icon: Globe
					// icon: <Icons.globe className="size-3" />,
				}
			],
			image: '',
			video: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4'
		}
	],
	hackathons: [
		{
			title: 'Hack Western 5',
			dates: 'November 23rd - 25th, 2018',
			location: 'London, Ontario',
			description:
				'Developed a mobile application which delivered bedtime stories to children using augmented reality.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
			links: []
		},
		{
			title: 'Hack The North',
			dates: 'September 14th - 16th, 2018',
			location: 'Waterloo, Ontario',
			description:
				'Developed a mobile application which delivers university campus wide events in real time to all students.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
			links: []
		},
		{
			title: 'FirstNet Public Safety Hackathon',
			dates: 'March 23rd - 24th, 2018',
			location: 'San Francisco, California',
			description:
				'Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.',
			// icon: "public",
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png',
			links: []
		},
		{
			title: 'DeveloperWeek Hackathon',
			dates: 'February 3rd - 4th, 2018',
			location: 'San Francisco, California',
			description:
				'Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg',
			links: [
				{
					title: 'Github',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/cryptotrends/cryptotrends'
				}
			]
		},
		{
			title: 'HackDavis',
			dates: 'January 20th - 21st, 2018',
			location: 'Davis, California',
			description:
				'Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png',
			win: 'Best Data Hack',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg',
			links: [
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/my6footprint'
				},
				{
					title: 'ML',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/my6footprint-machine-learning'
				},
				{
					title: 'iOS',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/CarbonWallet'
				},
				{
					title: 'Server',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/wallet6-server'
				}
			]
		},
		{
			title: 'ETH Waterloo',
			dates: 'October 13th - 15th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png',
			links: [
				{
					title: 'Organization',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/ethdocnet'
				}
			]
		},
		{
			title: 'Hack The North',
			dates: 'September 15th - 17th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed a virtual reality application allowing users to see themselves in third person.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Streamer Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/justinmichaud/htn2017'
				},
				{
					title: 'Client Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/RTSPClient'
				}
			]
		},
		{
			title: 'Hack The 6ix',
			dates: 'August 26th - 27th, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed an open platform for people shipping items to same place to combine shipping costs and save money.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/ShareShip/ShareShip'
				},
				{
					title: 'Site',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://share-ship.herokuapp.com/'
				}
			]
		},
		{
			title: 'Stupid Hack Toronto',
			dates: 'July 23rd, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/nsagirlfriend/nsagirlfriend'
				}
			]
		},
		{
			title: 'Global AI Hackathon - Toronto',
			dates: 'June 23rd - 25th, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg',
			win: '1st Place Winner',
			links: [
				{
					title: 'Article',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/'
				},
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/TinySamosas/'
				}
			]
		},
		{
			title: 'McGill AI for Social Innovation Hackathon',
			dates: 'June 17th - 18th, 2017',
			location: 'Montreal, Quebec',
			description: 'Developed realtime facial microexpression analyzer using AI',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg',
			links: []
		},
		{
			title: 'Open Source Circular Economy Days Hackathon',
			dates: 'June 10th, 2017',
			location: 'Toronto, Ontario',
			description:
				"Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
			image:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg',
			win: '1st Place Winner',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/genecis'
				}
			]
		},
		{
			title: "Make School's Student App Competition 2017",
			dates: 'May 19th - 21st, 2017',
			location: 'International',
			description: 'Improved PocketDoc and submitted to online competition',
			image:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png',
			win: 'Top 10 Finalist | Honourable Mention',
			links: [
				{
					title: 'Medium Article',
					icon: Github,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a'
				},
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/pocketdoc-react-native'
				},
				{
					title: 'YouTube',
					icon: Youtube,
					// icon: <Icons.youtube className="h-4 w-4" />,
					href: 'https://www.youtube.com/watch?v=XwFdn5Rmx68'
				},
				{
					title: 'Source',
					icon: Github,
					href: 'https://github.com/dillionverma/pocketdoc-react-native'
				}
			]
		},
		{
			title: 'HackMining',
			dates: 'May 12th - 14th, 2017',
			location: 'Toronto, Ontario',
			description: 'Developed neural network to optimize a mining process',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png',
			links: []
		},
		{
			title: 'Waterloo Equithon',
			dates: 'May 5th - 7th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png',
			links: [
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/pocketdoc-react-native'
				},
				{
					title: 'YouTube',
					icon: Youtube,
					// icon: <Icons.youtube className="h-4 w-4" />,
					href: 'https://www.youtube.com/watch?v=XwFdn5Rmx68'
				},
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/pocketdoc-react-native'
				}
			]
		},
		{
			title: 'SpaceApps Waterloo',
			dates: 'April 28th - 30th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/earthwatch'
				}
			]
		},
		{
			title: 'MHacks 9',
			dates: 'March 24th - 26th, 2017',
			location: 'Ann Arbor, Michigan',
			description:
				'Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/threejs-planes'
				}
			]
		},
		{
			title: 'StartHacks I',
			dates: 'March 4th - 5th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png',
			win: '1st Place Winner',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source (Mobile)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/recipic-ionic'
				},
				{
					title: 'Source (Server)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/recipic-rails'
				}
			]
		},
		{
			title: 'QHacks II',
			dates: 'February 3rd - 5th, 2017',
			location: 'Kingston, Ontario',
			description: 'Developed a mobile game which enables city-wide manhunt with random lobbies',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source (Mobile)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/human-huntr-react-native'
				},
				{
					title: 'Source (API)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/human-huntr-rails'
				}
			]
		},
		{
			title: 'Terrible Hacks V',
			dates: 'November 26th, 2016',
			location: 'Waterloo, Ontario',
			description:
				'Developed a mock of Windows 11 with interesting notifications and functionality',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/justinmichaud/TerribleHacks2016-Windows11'
				}
			]
		},
		{
			title: 'Portal Hackathon',
			dates: 'October 29, 2016',
			location: 'Kingston, Ontario',
			description:
				"Developed an internal widget for uploading assignments using Waterloo's portal app",
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/UWPortalSDK/crowmark'
				}
			]
		}
	]
};
