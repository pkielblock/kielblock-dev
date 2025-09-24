import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
// import Projects from "@/components/Projects"; // Disabled - Projects replaced with Resume
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Portfolio = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <main>
                <div id="top">
                    <Hero />
                </div>
                <About />
                <Resume />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Portfolio;