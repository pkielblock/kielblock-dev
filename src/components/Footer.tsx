import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-secondary/40 border-t border-border">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 font-heading">
                            <span className="gradient-primary bg-clip-text text-transparent">Pedro Kielblock</span>
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            Backend Developer passionate about creating digital experiences with modern technologies and clean code.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/pkielblock"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-smooth"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/pedrokielblock"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-smooth"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:pedro@kielblock.dev"
                                className="text-muted-foreground hover:text-primary transition-smooth"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-muted-foreground hover:text-primary transition-smooth"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-muted-foreground hover:text-primary transition-smooth"
                            >
                                About
                            </button>
                            <button
                                onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-muted-foreground hover:text-primary transition-smooth"
                            >
                                Resume
                            </button>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="block text-muted-foreground hover:text-primary transition-smooth"
                            >
                                Hire Me
                            </button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">Get In Touch</h4>
                        <div className="space-y-2 text-muted-foreground">
                            <p>Santo André - SP, Brazil</p>
                            <a
                                href="mailto:pedro@kielblock.dev"
                                className="block hover:text-primary transition-smooth"
                            >
                                pedro@kielblock.dev
                            </a>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get In Touch
                        </Button>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 text-muted-foreground mb-4 md:mb-0">
                        <span>© {currentYear} Pedro Kielblock</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToTop}
                        className="hover:text-primary hover:bg-accent/50"
                    >
                        Back to Top ↑
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;