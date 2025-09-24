import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { name: "Home", id: "top" },
        { name: "About", id: "about" },
        { name: "Resume", id: "resume" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-smooth ${isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-card"
            : "bg-transparent"
            }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection("top")}
                        className="font-bold text-xl font-heading hover:text-primary transition-smooth"
                    >
                        <span className="gradient-primary bg-clip-text text-transparent">kielblock.dev</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-muted-foreground hover:text-foreground transition-smooth relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-smooth" />
                            </button>
                        ))}
                        <Button
                            variant="hero"
                            size="sm"
                            onClick={() => scrollToSection("contact")}
                        >
                            Hire Me
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-card animate-fade-in">
                        <div className="flex flex-col space-y-4 p-6">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-left text-muted-foreground hover:text-foreground transition-smooth py-2"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <Button
                                variant="hero"
                                size="sm"
                                onClick={() => scrollToSection("contact")}
                                className="w-full"
                            >
                                Hire Me
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;