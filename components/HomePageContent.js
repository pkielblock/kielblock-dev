'use client';

import { useState, useEffect } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import Image from "next/image";
import { RiAngularjsLine } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import dynamic from 'next/dynamic';
import ClientOnly from './ClientOnly';

// Dynamically import components that are client-only or cause hydration issues
const Typewriter = dynamic(() => import('react-simple-typewriter').then(mod => mod.Typewriter), { ssr: false });
const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), { ssr: false });

// Renamed to avoid conflict, marked as client component
export default function HomePageContent({ dict, lang }) { 
	// Initialize state to null to avoid hydration mismatch
	const [darkMode, setDarkMode] = useState(false); // Default to false for server render
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Effect to set initial theme based on localStorage or system preference
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			setDarkMode(true);
		} else {
			setDarkMode(false);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	// Function to toggle theme and save preference
	const toggleDarkMode = () => {
		setDarkMode(prevMode => {
			const newMode = !prevMode;
			localStorage.setItem('theme', newMode ? 'dark' : 'light');
			return newMode;
		});
	};

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<ClientOnly>
			<div className={darkMode ? "dark" : ""}>
				<main id="home" className="bg-white px-10 md:px-20 lg:px-40 dark:bg-black">
					<section>
						<nav className="py-10 flex justify-between">
							<div className="p-2 flex items-center">
								<a href={`/${lang}`} className="hover:opacity-80 transition-opacity">
									<ClientOnly fallback={<div className="w-[100px] h-[33px]"></div>}>
										<Image 
											src={darkMode ? "/nameheaderwhite.png" : "/nameheaderblack.png"}
											alt={dict.navigation.logoAlt}
											width={100}
											height={33}
											priority
											className="transition-opacity duration-300"
										/>
									</ClientOnly>
								</a>
							</div>
							<ul className="flex items-center">
								<li>
									<ClientOnly fallback={<div className="p-2 text-sm me-4 md:me-6"></div>}>
										<LanguageSwitcher />
									</ClientOnly>
								</li> 
								<li>
									<button
										onClick={toggleModal}
										className="hover:underline p-2 text-lg me-4 md:me-6 text-black dark:text-white"
									>
										{dict.navigation.resume}
									</button>
								</li>
								<li>
									<ClientOnly fallback={<div className="w-[24px] h-[24px]"></div>}>
										{darkMode ? (
											<MdLightMode
												onClick={toggleDarkMode}
												className="hover:scale-110 transition duration-250 cursor-pointer text-2xl dark:text-white"
											/>
										) : (
											<MdDarkMode
												onClick={toggleDarkMode}
												className="hover:scale-110 transition duration-250 cursor-pointer text-2xl"
											/>
										)}
									</ClientOnly>
								</li>
							</ul>
						</nav>
						<div className="text-center p-10">
							<div className="mb-10 relative mx-auto w-60 h-60 overflow-hidden md:mb-11">
								<ClientOnly fallback={<div className="w-[460px] h-[460px]"></div>}>
									<Image 
										alt={dict.hero.profilePicAlt}
										src={darkMode ? "/logowhitenb.png" : "/logoblacknb.png"}
										width={460}
										height={460}
										priority
										loading="eager"
										quality={90}
										className="object-cover transition-opacity duration-300"
									/>
								</ClientOnly>
							</div>
							<h2 id="name" className="text-2xl py-2 text-black dark:text-white font-medium md:text-4xl lg:text-5xl">
								{dict.hero.name}
							</h2>
							<h3 className="text-1xl pt-2 pb-12 md:text-2xl dark:text-gray-300 h-8 md:h-10">
								<ClientOnly fallback={<span>{dict.hero.title}</span>}>
									<Typewriter 
										words={[dict.hero.title]} 
										cursor 
										cursorStyle="_" 
										typeSpeed={200} 
										deleteSpeed={100} 
										loop={true}
									/>
								</ClientOnly>
							</h3>
							<p className="text-md py-5 leading-8 text-gray-950 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200">
								{dict.hero.description}
							</p>
							<div className="text-5xl flex justify-center gap-20 py-20 text-gray-950 dark:text-white">
								<a href="https://github.com/pkielblock" target="_blank">
									<AiFillGithub className="hover:scale-110 transition duration-250"/>
								</a>
								<a href="https://www.linkedin.com/in/pedrokielblock/" target="_blank">
									<AiFillLinkedin className="hover:scale-110 transition duration-250"/>
								</a>
								<a href="mailto:pedro@kielblock.dev" target="_blank">
									<AiFillMail className="hover:scale-110 transition duration-250"/>
								</a>
							</div>
						</div>
					</section>
					<ClientOnly>
						{isModalOpen && (
							<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
								<div className="bg-white dark:bg-black outline outline-2 outline-black dark:outline-white p-5 shadow-lg relative">
									<button
										onClick={toggleModal}
										className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
									>
										×
									</button>
									<h2 className="pb-2 text-xl mb-4 dark:text-white text-center">{dict.resumeModal.title}</h2>
									<p className="mb-4 dark:text-white text-center pb-2">
										{dict.resumeModal.prompt}
									</p>
									<hr className="w-20 m-auto pb-4 border-black dark:border-white"></hr>
									<div className="flex gap-4 justify-center">
										<a
											target="_blank"
											href="https://drive.google.com/file/d/124NFRAQzx51qlAiCS3E_JnrCG3uma6Jz/view"
											className="text-black hover:bg-black hover:text-white px-4 py-2 w-25 flex-grow text-center dark:text-white dark:hover:bg-white dark:hover:text-black"
										>
											{dict.resumeModal.english}
										</a>
										<a
											target="_blank"
											href="https://drive.google.com/file/d/1RPYDXRMQfARxcS_vjnh0p__eMTjIVR4m/view"
											className="text-black hover:bg-black hover:text-white  px-4 py-2 w-25 flex-grow text-center dark:text-white dark:hover:bg-white dark:hover:text-black"
										>
											{dict.resumeModal.portuguese}
										</a>
									</div>
								</div>
							</div>
						)}
					</ClientOnly>
					<section>
						<hr className="dark: w-20 m-auto pt-5 pb-20 border-black dark:border-white"></hr>
						<div className="mb-10">
							<h3 id="background" className="text-3xl py-1 mb-5 text-center dark:text-white">
								{dict.background.title}
							</h3>
							<p 
								className="text-md py-2 leading-8 text-gray-950 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200"
								dangerouslySetInnerHTML={{ __html: dict.background.description }}
							>
							</p>
						</div>
						<div>
							<h3 id="stack" className="text-3xl py-1 mb-5 text-center dark:text-white">
								{dict.stack.title}
							</h3>
							<div className="text-5xl flex justify-center gap-20 py-3 text-gray-950 dark:text-white">
								<div className="p-1 hover:scale-110 transition duration-250">
									<FaJava/>
									<span className="pl-2 text-sm">{dict.stack.java}</span>
								</div>
								<div className="p-1 hover:scale-110 transition duration-250">
									<BiLogoSpringBoot/>
									<span className="pl-1 text-sm">{dict.stack.spring}</span>
								</div>
								<div className="p-1 hover:scale-110 transition duration-250">
									<RiAngularjsLine/>
									<span className="text-sm pl-0">{dict.stack.angular}</span>
								</div>
							</div>
							<p className="text-md mb-10 py-2 leading-8 v md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200"
								dangerouslySetInnerHTML={{ __html: dict.stack.description }}
							>
							</p>
						</div>
					</section>
					<footer className="bg-white dark:bg-black pt-10">
						<div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between text-center">
							<div className="flex items-center">
								<a href={`/${lang}`} className="hover:opacity-80 transition-opacity">
									<ClientOnly fallback={<div className="w-[90px] h-[33px]"></div>}>
										<Image 
											src={darkMode ? "/nameheaderwhite.png" : "/nameheaderblack.png"}
											alt={dict.footer.logoAlt}
											width={90}
											height={33}
											className="transition-opacity duration-300"
										/>
									</ClientOnly>
								</a>
							</div>
							<ul className="flex flex-wrap justify-center items-center mt-3 md:mt-0 text-sm font-medium text-black dark:text-white">
								<li>
									<a href="#home" className="hover:underline mx-2 md:mx-4">
										{dict.footer.home}
									</a>
								</li>
								<li>
									<a href="#background" className="hover:underline mx-2 md:mx-4">
										{dict.footer.background}
									</a>
								</li>
								<li>
									<a href="#stack" className="hover:underline mx-2 md:mx-4">
										{dict.footer.stack}
									</a>
								</li>
							</ul>
						</div>
					</footer>
				</main>
			</div>
		</ClientOnly>
	);
} 