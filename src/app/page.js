"use client";

import { useState } from "react";
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import Image from "next/image";
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
			<main id="home" className="bg-white px-10 md:px-20 lg:px-40 dark:bg-black">
				<section>
					<nav className="py-10 flex justify-between">
						<div className="p-2 flex items-center">
							<a href="https://kielblock.dev" className="hover:opacity-80 transition-opacity">
								<Image 
									src={darkMode ? "/nameheaderwhite.png" : "/nameheaderblack.png"}
									alt="kielblock.dev logo"
									width={100}
									height={33}
									priority
									className="transition-opacity duration-300"
								/>
							</a>
						</div>
						<ul className="flex items-center">
							<li>
								<button
									onClick={toggleModal}
									className="hover:underline p-2 text-lg me-4 md:me-6 text-black dark:text-white"
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
						<div className="mb-10 relative mx-auto w-60 h-60 overflow-hidden md:mb-11">
							<Image 
								alt="Profile Picture Featuring Pedro Kielblock" 
								src={darkMode ? "/logowhitenb.png" : "/logoblacknb.png"}
								width={460}
								height={460}
								priority
								loading="eager"
								quality={90}
								className="object-cover transition-opacity duration-300"
							/>
						</div>
						<h2 id="name" className="text-2xl py-2 text-black dark:text-white font-medium md:text-4xl lg:text-5xl">
							Pedro Kielblock
						</h2>
						<h3 className="text-1xl pt-2 pb-12 md:text-2xl dark:text-gray-300">
							<Typewriter words={["Software Developer"]} cursor cursorStyle="_" typeSpeed={200} deleteSpeed={100} loop={true}/>
						</h3>
						<p className="text-md py-5 leading-8 text-gray-950 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200">
							I am a passionate developer dedicated to continuous improvement and growth in my
							field. Each day
							presents a new opportunity to enhance my skills and contribute to innovative solutions.
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
				{isModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
						<div className="bg-white dark:bg-black outline outline-2 outline-black dark:outline-white p-5 shadow-lg relative">
							<button
								onClick={toggleModal}
								className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl"
							>
								×
							</button>
							<h2 className="pb-2 text-xl mb-4 dark:text-white text-center">Resume</h2>
                            <p className="mb-4 dark:text-white text-center pb-2">
								Click on the desired language.
							</p>
                            <hr className="w-20 m-auto pb-4 border-black dark:border-white"></hr>
							<div className="flex gap-4 justify-center">
								<a
									target="_blank"
									//href="https://drive.google.com/uc?export=download&id=124NFRAQzx51qlAiCS3E_JnrCG3uma6Jz"
									//download="pedro_resume.pdf"
									href="https://drive.google.com/file/d/124NFRAQzx51qlAiCS3E_JnrCG3uma6Jz/view"
									className="text-black hover:bg-black hover:text-white px-4 py-2 w-25 flex-grow text-center dark:text-white dark:hover:bg-white dark:hover:text-black"
								>
									English (US)
								</a>
								<a
									target="_blank"
									//href="https://drive.google.com/uc?export=download&id=1RPYDXRMQfARxcS_vjnh0p__eMTjIVR4m"
									//download="cv_pedro.pdf"
									href="https://drive.google.com/file/d/1RPYDXRMQfARxcS_vjnh0p__eMTjIVR4m/view"
									className="text-black hover:bg-black hover:text-white  px-4 py-2 w-25 flex-grow text-center dark:text-white dark:hover:bg-white dark:hover:text-black"
								>
									Português (BR)
								</a>
							</div>
						</div>
					</div>
				)}
				<section>
					<hr className="dark: w-20 m-auto pt-5 pb-20 border-black dark:border-white"></hr>
					<div className="mb-10">
						<h3 id="background" className="text-3xl py-1 mb-5 text-center dark:text-white">
							Background
						</h3>
						<p className="text-md py-2 leading-8 text-gray-950 md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200">
							I hold a diploma in Systems Development from ETEC Lauro Gomes and a degree in Analysis and
							Systems
							Development from FATEC São Caetano do Sul - Antonio Russo. This background provides a
							comprehensive
							understanding of the technical and theoretical aspects of the field. My fluency in English
							is certified by{" "}
							<a
								className="font-bold text-black dark:text-white underline hover:text-gray-600 dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/first/"
								target="_blank"
							>
								B2 First
							</a>
							{""},{" "}
							<a
								className="font-bold text-black dark:text-white underline hover:text-gray-600 dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/advanced/"
								target="_blank"
							>
								C1 Advanced
							</a>{" "}
							and{" "}
							<a
								className="font-bold text-black dark:text-white underline hover:text-gray-600 dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/proficiency/"
								target="_blank"
							>
								C2 Proficiency
							</a>{" "}
							qualifications, enabling effective communication in diverse professional settings.
							Currently, I am
							leveraging these skills in my role as a Systems Analyst at{" "}
							<a
								className="font-bold text-black dark:text-white underline hover:text-gray-600 dark:hover:text-gray-300"
								href="https://www.rethinkingworks.com/"
								target="_blank"
							>
								ReThinkingWorks
							</a>
							, where I engage in a range of innovative projects, applying my technical expertise and
							analytical skills
							to develop and optimize systems, keeping pace with the rapidly evolving technological
							landscape.
						</p>
					</div>
					<div>
						<h3 id="stack" className="text-3xl py-1 mb-5 text-center dark:text-white">
							Stack
						</h3>
						<div className="text-5xl flex justify-center gap-20 py-3 text-gray-950 dark:text-white">
							<div className="p-1 hover:scale-110 transition duration-250">
								<FaJava/>
								<span className="pl-2 text-sm">Java</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<BiLogoSpringBoot/>
								<span className="pl-1 text-sm">Spring</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<RiAngularjsLine/>
								<span className="text-sm pl-0">Angular</span>
							</div>
						</div>
						<p className="text-md mb-10 py-2 leading-8 v md:text-xl max-w-xl lg:max-w-5xl mx-auto md:leading-10 dark:text-gray-200">
							I specialize in Web Development, with a particular emphasis on{" "}
							<span className="font-bold text-black dark:text-white">backend</span> technologies
							using{" "}
							<span className="font-bold text-black dark:text-white">Java</span> and{" "}
							<span className="font-bold text-black dark:text-white">Spring Boot</span>. While my primary
							expertise lies
							in this area, I maintain a flexible and expansive approach to learning.
						</p>
					</div>
				</section>
				<footer className="bg-white dark:bg-black pt-10">
					<div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row items-center md:justify-between text-center">
						<div className="flex items-center">
							<a href="https://kielblock.dev/" className="hover:opacity-80 transition-opacity">
								<Image 
									src={darkMode ? "/nameheaderwhite.png" : "/nameheaderblack.png"}
									alt="kielblock.dev logo"
									width={90}
									height={33}
									className="transition-opacity duration-300"
								/>
							</a>
						</div>
						<ul className="flex flex-wrap justify-center items-center mt-3 md:mt-0 text-sm font-medium text-black dark:text-white">
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
