"use client";

import { useState } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import Image from "next/image";
import profile from "../../public/profile.png";
import { RiAngularjsLine } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
	const [darkMode, setDarkMode] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	return (
		<div className={darkMode ? "dark" : ""}>
			<main id="home" className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-950">
				<section>
					<nav className="py-10 flex justify-between">
						<h1 className="text-xl dark:text-white">
							<a href="https://kielblock.dev">kielblock.dev</a>
						</h1>
						<ul className="flex items-center">
							<li>
								<button
									onClick={toggleModal}
									className="hover:underline bg-blue-400 p-1 rounded-sm me-4 md:me-6 dark:text-white"
								>
									Resume
								</button>
							</li>
							<li>
								{darkMode ? (
									<MdLightMode
										onClick={() => setDarkMode(!darkMode)}
										className="hover:scale-110 transition duration-250 cursor-pointer text-2xl dark:text-white"
									/>
								) : (
									<MdDarkMode
										onClick={() => setDarkMode(!darkMode)}
										className="hover:scale-110 transition duration-250 cursor-pointer text-2xl"
									/>
								)}
							</li>
						</ul>
					</nav>
					<div className="text-center p-10">
						<div className="mb-10 relative mx-auto rounded-full w-60 h-60 overflow-hidden md:mb-11">
							<Image alt="Profile Picture Featuring Pedro Kielblock" src={profile} />
						</div>
						<h2 className="text-4xl py-2 text-blue-400 font-medium md:text-5xl lg:text-6xl">Pedro Kielblock</h2>
						<h3 className="text-2xl py-2 md:text-3xl dark:text-white">
							<Typewriter words={["Software Developer"]} cursor cursorStyle="_" typeSpeed={200} />
						</h3>
						<p className="text-md py-5 leading-8 text-gray-600 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-300">
							Hey 👋 I am a passionate developer dedicated to continuous improvement and growth in my field. Each day
							presents a new opportunity to enhance my skills and contribute to innovative solutions. 😎
						</p>
						<div className="text-5xl flex justify-center gap-20 py-20 text-gray-950 dark:text-white">
							<a href="https://github.com/pkielblock" target="_blank">
								<AiFillGithub className="hover:scale-110 transition duration-250" />
							</a>
							<a href="https://www.linkedin.com/in/pedrokielblock/" target="_blank">
								<AiFillLinkedin className="hover:scale-110 transition duration-250" />
							</a>
							<a href="mailto:pedro@kielblock.dev" target="_blank">
								<AiFillMail className="hover:scale-110 transition duration-250" />
							</a>
						</div>
					</div>
				</section>
				{isModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-lg relative">
							<button
								onClick={toggleModal}
								className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
							>
								×
							</button>
							<h2 className="text-xl mb-4 dark:text-white text-center">Resume</h2>
							<p className="mb-4 dark:text-white text-center">
								Here you will find my resume both in Portuguese and English
							</p>
							<div className="flex gap-4 justify-center">
								<a
									target="_blank"
									//href="https://drive.google.com/uc?export=download&id=124NFRAQzx51qlAiCS3E_JnrCG3uma6Jz"
									//download="pedro_resume.pdf"
									href="https://drive.google.com/file/d/124NFRAQzx51qlAiCS3E_JnrCG3uma6Jz/view"
									className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-40 flex-grow text-center"
								>
									English (US)
								</a>
								<a
									target="_blank"
									//href="https://drive.google.com/uc?export=download&id=1RPYDXRMQfARxcS_vjnh0p__eMTjIVR4m"
									//download="cv_pedro.pdf"
									href="https://drive.google.com/file/d/1RPYDXRMQfARxcS_vjnh0p__eMTjIVR4m/view"
									className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-40 flex-grow text-center"
								>
									Português (BR)
								</a>
							</div>
						</div>
					</div>
				)}
				<section>
					<div className="mb-10">
						<h3 id="background" className="text-3xl py-1 mb-5 text-center dark:text-white">
							Background
						</h3>
						<p className="text-md py-2 leading-8 text-gray-600 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-300">
							I hold a diploma in Systems Development from ETEC Lauro Gomes and a degree in Analysis and Systems
							Development from FATEC São Caetano do Sul - Antonio Russo. This background provides a comprehensive
							understanding of the technical and theoretical aspects of the field. My fluency in English is certified by{" "}
							<a
								className="font-bold dark:text-white underline hover:text-black dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/first/"
								target="_blank"
							>
								B2 First
							</a>
							{""},{" "}
							<a
								className="font-bold dark:text-white underline hover:text-black dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/advanced/"
								target="_blank"
							>
								C1 Advanced
							</a>{" "}
							and{" "}
							<a
								className="font-bold dark:text-white underline hover:text-black dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/proficiency/"
								target="_blank"
							>
								C2 Proficiency
							</a>{" "}
							qualifications, enabling effective communication in diverse professional settings. Currently, I am
							leveraging these skills in my role as a Systems Analyst at{" "}
							<a
								className="font-bold text-blue-400 underline hover:text-blue-500"
								href="https://www.rethinkingworks.com/"
								target="_blank"
							>
								ReThinkingWorks
							</a>
							, where I engage in a range of innovative projects, applying my technical expertise and analytical skills
							to develop and optimize systems, keeping pace with the rapidly evolving technological landscape.
						</p>
					</div>
					<div>
						<h3 id="stack" className="text-3xl py-1 mb-5 text-center dark:text-white">
							Stack
						</h3>
						<div className="text-5xl flex justify-center gap-20 py-3 text-gray-950 dark:text-white">
							<div className="p-1 hover:scale-110 transition duration-250">
								<FaJava />
								<span className="pl-2 text-sm">Java</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<BiLogoSpringBoot />
								<span className="pl-1 text-sm">Spring</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<RiAngularjsLine />
								<span className="text-sm pl-0">Angular</span>
							</div>
						</div>
						<p className="text-md mb-10 py-2 leading-8 text-gray-600 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-300">
							I specialize in Web Development, with a particular emphasis on{" "}
							<span className="font-bold dark:text-white">backend</span> technologies using{" "}
							<span className="font-bold dark:text-white">Java</span> and{" "}
							<span className="font-bold dark:text-white">Spring Boot</span>. While my primary expertise lies in this
							area, I maintain a flexible and expansive approach to learning.
						</p>
					</div>
				</section>
				<footer className="bg-white dark:bg-gray-950">
					<div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between text-center">
						<span className="text-sm text-gray-600 dark:text-gray-300">
							<a href="https://kielblock.dev/" className="hover:underline">
								kielblock.dev
							</a>
						</span>
						<ul className="flex flex-wrap justify-center items-center mt-3 md:mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
							<li>
								<a href="#home" className="hover:underline mx-2 md:mx-4">
									Home
								</a>
							</li>
							<li>
								<a href="#background" className="hover:underline mx-2 md:mx-4">
									Background
								</a>
							</li>
							<li>
								<a href="#stack" className="hover:underline mx-2 md:mx-4">
									Stack
								</a>
							</li>
						</ul>
					</div>
				</footer>
			</main>
		</div>
	);
}
