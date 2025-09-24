import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Globe } from "lucide-react";

const About = () => {
    const skills = {
        "Frontend": {
            icon: <Globe className="h-6 w-6" />,
            technologies: ["Angular", "Tailwind CSS"]
        },
        "Backend": {
            icon: <Database className="h-6 w-6" />,
            technologies: ["Java", "Spring Boot", "PostgreSQL"]
        },
        "Tools & Others": {
            icon: <Code className="h-6 w-6" />,
            technologies: ["Docker", "Git", "GitHub"]
        }
    };

    return (
        <section id="about" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                        About <span className="gradient-primary bg-clip-text text-transparent">Me</span>
                    </h2>
                    <div className="w-20 h-1 gradient-primary mx-auto mb-6 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Bio Section */}
                    <div className="animate-fade-in-up">
                        <h3 className="text-2xl font-semibold mb-6">
                            Software Development
                        </h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I hold a diploma in <b>Systems Development</b> <b>from ETEC Lauro Gomes</b> and a degree in <b>Analysis and Systems Development</b> from <b>FATEC São Caetano do Sul – Antonio Russo</b>.
                            </p>
                            <p>
                                I'm proficient in English, with certifications at the <a href="https://www.cambridgeenglish.org/exams-and-tests/first/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-primary hover:decoration-primary transition-smooth">B2 First</a>, <a href="https://www.cambridgeenglish.org/exams-and-tests/advanced/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-primary hover:decoration-primary transition-smooth">C1 Advanced</a>, and <a href="https://www.cambridgeenglish.org/exams-and-tests/proficiency/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-primary hover:decoration-primary transition-smooth">C2 Proficiency</a> levels, which allows me to communicate effectively in diverse professional environments.
                            </p>
                            <p>
                                Currently, I work as a Systems Analyst at <a href="https://www.rethinkingworks.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-primary hover:decoration-primary transition-smooth">ReThinkingWorks</a>, where I contribute to a variety of innovative projects.
                            </p>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in-right">
                        {Object.entries(skills).map(([category, { icon, technologies }]) => (
                            <Card key={category} className="shadow-card hover:shadow-glow transition-smooth group">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-primary group-hover:scale-110 transition-smooth">
                                            {icon}
                                        </div>
                                        <h4 className="font-semibold text-lg">{category}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;