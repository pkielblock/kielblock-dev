"use client";

import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import Image from "next/image";
import profile from "../../public/profile.png";
import { DiLinux, DiMysql } from "react-icons/di";
import { FaJava } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
	const [darkMode, setDarkMode] = useState(true);

	return (
		<div className={darkMode ? "dark" : ""}>
			<main id="home" className="bg-white px-10 md:px-20 lg-px-40 dark:bg-gray-950">
				<section>
					<nav className="py-10 flex justify-between">
						<h1 className="text-xl dark:text-white">
							<a href="https://kielblock.dev">kielblock.dev</a>
						</h1>
						<ul className="flex items-center">
							<li>
								<a
									href="https://drive.google.com/uc?export=download&id=1mfLTIS7XkC6T7iXBscokcSqj4fWChfHY"
									download="pedro_resume.pdf"
									className="hover:underline bg-blue-400 p-1 rounded-sm me-4 md:me-6 
                  dark:text-white"
								>
									Resume
								</a>
							</li>
							<li>
								{darkMode ? (
									<MdLightMode
										onClick={() => setDarkMode(!darkMode)}
										className="hover:scale-110 transition duration-250 
                  cursor-pointer text-2xl dark:text-white"
									/>
								) : (
									<MdDarkMode
										onClick={() => setDarkMode(!darkMode)}
										className="hover:scale-110 transition duration-250 
                  cursor-pointer text-2xl"
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
						<p
							className="text-md py-5 leading-8 text-gray-600 md:text-xl max-w-xl mx-auto md:leading-10  
            dark:text-gray-300"
						>
							Hey 👋 I am a passionate developer dedicated to continuous improvement and growth in my field. Each day
							presents a new opportunity to enhance my skills and contribute to innovative solutions. 😎
						</p>
						<div className="text-5xl flex justify-center gap-16 py-20 text-gray-950  dark:text-white">
							<a href="https://github.com/pkielblock" target="_blank">
								<AiFillGithub
									className="hover:scale-110 
              transition duration-250 "
								/>
							</a>
							<a href="https://www.linkedin.com/in/pedrokielblock/" target="_blank">
								<AiFillLinkedin className="hover:scale-110 transition duration-250" />
							</a>
							<a href="mailto:pedro@kielblock.dev" target="_blank">
								<AiFillMail
									className="hover:scale-110 transition 
              duration-250"
								/>
							</a>
						</div>
					</div>
				</section>
				<section>
					<div className="mb-10">
						<h3 id="background" className="text-3xl py-1 mb-5 text-center  dark:text-white">
							Background
						</h3>
						<p
							className="text-md py-2 leading-8 text-gray-600 md:text-xl md:leading-10 max-w-xl mx-auto  
            dark:text-gray-300"
						>
							I hold a diploma in Systems Development from ETEC Lauro Gomes and a degree in Analysis and Systems
							Development from FATEC São Caetano do Sul - Antonio Russo. This dual background provides a comprehensive
							understanding of the technical and theoretical aspects of the field. My fluency in English is certified by{" "}
							<a
								className="font-bold  dark:text-white underline hover:text-black dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/first/"
								target="_blank"
							>
								B2 First
							</a>{" "}
							and{" "}
							<a
								className="font-bold  dark:text-white underline hover:text-black dark:hover:text-gray-300"
								href="https://www.cambridgeenglish.org/exams-and-tests/advanced/"
								target="_blank"
							>
								C1 Advanced
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
						<h3 id="stack" className="text-3xl py-1 mb-5 text-center  dark:text-white">
							Stack
						</h3>
						<div className="text-5xl flex justify-center gap-10 py-3 text-gray-950  dark:text-white">
							<div className="p-1 hover:scale-110 transition duration-250">
								<FaJava />
								<span className="pl-2 text-sm">Java</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<BiLogoSpringBoot />
								<span className="pl-1 text-sm">Spring</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<DiMysql />
								<span className="text-sm pl-1">MySQL</span>
							</div>
							<div className="p-1 hover:scale-110 transition duration-250">
								<DiLinux />
								<span className="text-sm pl-2">Linux</span>
							</div>
						</div>
						<p
							className="text-md mb-10 py-2 leading-8 text-gray-600 md:text-xl max-w-xl mx-auto md:leading-10  
            dark:text-gray-300"
						>
							I specialize in Web Development, with a particular emphasis on{" "}
							<span
								className="font-bold  
              dark:text-white"
							>
								backend
							</span>{" "}
							technologies using <span className="font-bold  dark:text-white">Java</span> and{" "}
							<span className="font-bold  dark:text-white">Spring Boot</span>. While my primary expertise lies in this
							area, I maintain a flexible and expansive approach to learning. I am continuously exploring and studying
							various other areas and programming languages, ensuring a well-rounded and adaptable skill set in the
							ever-evolving field of web development.
						</p>
					</div>
				</section>
				<footer className="bg-white dark:bg-gray-950">
					<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
						<span className="text-sm text-gray-600 sm:text-center dark:text-gray-300">
							<a href="https://kielblock.dev/" className="hover:underline">
								kielblock.dev
							</a>
						</span>
						<ul className="flex flex-wrap  items-center mt-3 text-sm font-medium text-gray-600 dark:text-gray-300 sm:mt-0">
							<li>
								<a href="#home" className="hover:underline me-4 md:me-6">
									Home
								</a>
							</li>
							<li>
								<a href="#background" className="hover:underline me-4 md:me-6">
									Background
								</a>
							</li>
							<li>
								<a href="#stack" className="hover:underline me-4 md:me-6">
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
