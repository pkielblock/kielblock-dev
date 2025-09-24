import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";

const Hero = () => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Modern workspace setup"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                <div className="absolute inset-0 gradient-hero" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading">
                        <span className="text-foreground">Pedro</span>{" "}
                        <span className="gradient-primary bg-clip-text text-transparent animate-glow">
                            Kielblock
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in delay-200">
                        Backend Developer
                    </p>

                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
                        I’m a passionate developer committed to continuous learning and growth. Every day brings a new chance to sharpen my skills and contribute to building innovative solutions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-500">
                        <Button
                            variant="hero"
                            size="lg"
                            onClick={() => scrollToSection('resume')}
                        >
                            View My Resume
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection('contact')}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Get In Touch
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mb-12 animate-slide-in-right delay-700">
                        <a
                            href="https://github.com/pkielblock"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth p-2 hover:scale-110"
                        >
                            <Github className="h-6 w-6" />
                        </a>
                        <a
                            href="https://linkedin.com/in/pedrokielblock"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth p-2 hover:scale-110"
                        >
                            <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                            href="mailto:pedro@kielblock.dev"
                            className="text-muted-foreground hover:text-primary transition-smooth p-2 hover:scale-110"
                        >
                            <Mail className="h-6 w-6" />
                        </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
                        <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;