import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, MapPin, Mail, Calendar, GraduationCap, Briefcase, Award, Globe } from "lucide-react";

const Resume = () => {
    const handleDownload = () => {
        // TODO: Replace with actual Resume file path
        const link = document.createElement('a');
        link.href = '/resume-pedro-kielblock.pdf'; // Place your Resume PDF in the public folder
        link.download = 'Pedro-Kielblock-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const personalInfo = {
        name: "Pedro Kielblock",
        title: "Systems Analyst",
        location: "Santo André - São Paulo",
        email: "pedro@kielblock.dev",
        linkedin: "linkedin.com/in/pedrokielblock",
        github: "github.com/pkielblock",
        website: "kielblock.dev"
    };

    const education = [
        {
            degree: "Bachelor of Technology in Systems Analysis and Development",
            institution: "FATEC São Caetano do Sul - Antonio Russo",
            period: "2023",
            type: "Bachelor's Degree"
        },
        {
            degree: "Technical Degree in Systems Development",
            institution: "ETEC Lauro Gomes",
            period: "2019",
            type: "Technical Diploma"
        }
    ];

    const experience = [
        {
            position: "Systems Analyst",
            company: "ReThinkingWorks",
            period: "Jan 2024 - Present",
            location: "Santo André, SP",
            responsibilities: [
                "Developed solutions using monday.com, Pipefy, and FuseBase",
                "Integrated REST APIs within company systems",
                "Created dashboards with PowerBI and Fabric",
                "Continuous development and maintenance of company website, blog, and newsletter",
                "Wrote and communicated regularly in English"
            ]
        },
        {
            position: "Intern",
            company: "ReThinkingWorks",
            period: "Jul 2022 - Dec 2023",
            location: "Santo André, SP",
            responsibilities: [
                "Developed solutions using monday.com, Pipefy, and FuseBase",
                "Continuous development and maintenance of company website, blog, and newsletter",
                "Wrote and communicated regularly in English"
            ]
        }
    ];

    const skills = {
        "Backend": ["Java", "Spring Boot", "REST APIs"],
        "Frontend": ["Tailwind CSS", "Angular", "SCSS"],
        "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
        "Operating Systems": ["Windows", "Linux"],
        "Project Management": ["Monday.com", "Pipefy"],
        "Data Analysis": ["PowerBI"],
        "Office Applications": ["Microsoft Word", "Outlook", "Excel", "PowerPoint", "LibreOffice"]
    };

    const certifications = [
        "Cambridge Assessment English - C2 Proficiency, 202 (2024)",
        "Cambridge Assessment English - C1 Advanced, 185 (2021)",
        "Cambridge Assessment English - B2 First, 163 (2018)",
        "ETS - TOEIC, 925 (2023)"
    ];

    const courses = [
        "Complete Java Course - REST API/Spring Boot/OOP/JPA, 54.5 hours (Udemy, 2023)",
        "Extension: Internet of Things and Smart Environments (FATEC, 2021)",
        "PowerBI Dashboard Development (2024)"
    ];

    const languages = [
        "Portuguese (Native)",
        "English (Proficient)",
        "Spanish (Basic)"
    ];

    return (
        <section id="resume" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                        My <span className="gradient-primary bg-clip-text text-transparent">Resume</span>
                    </h2>
                    <div className="w-20 h-1 gradient-primary mx-auto mb-6 rounded-full" />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-4">
                        Backend-focused software developer with experience in web technologies, REST API integration, and dashboard development. Skilled at maintaining and building websites, blogs, and newsletters. Passionate about creating efficient and innovative solutions.
                    </p>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base mb-8">
                        Download my complete resume or view the highlights below to learn more about my background and experience.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="hero"
                            size="lg"
                            onClick={handleDownload}
                            className="group"
                        >
                            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                            Download Resume
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.open('/resume-pedro-kielblock.pdf', '_blank')}
                            className="bg-secondary/60 backdrop-blur-sm border border-border/50 hover:bg-secondary/80"
                        >
                            <Eye className="mr-2 h-5 w-5" />
                            View Online
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Personal Info & Contact */}
                    <div className="lg:col-span-1 space-y-6 flex flex-col">
                        <Card className="shadow-card hover:shadow-glow transition-smooth h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{personalInfo.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-primary transition-smooth">
                                        {personalInfo.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-smooth">
                                        {personalInfo.website}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-card hover:shadow-glow transition-smooth h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {certifications.map((cert, index) => (
                                        <div key={index} className="text-xs text-muted-foreground p-2 border border-border rounded">
                                            {cert}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-card hover:shadow-glow transition-smooth h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {courses.map((course, index) => (
                                        <div key={index} className="text-xs text-muted-foreground p-2 border border-border rounded">
                                            {course}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-card hover:shadow-glow transition-smooth h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle>Languages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {languages.map((lang, index) => (
                                        <Badge key={index} variant="secondary" className="w-full justify-start p-2">
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8 flex flex-col">
                        {/* Education */}
                        <Card className="shadow-card hover:shadow-glow transition-smooth animate-fade-in-up h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    Education
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {education.map((edu, index) => (
                                    <div key={index} className="border-l-2 border-primary/30 pl-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{edu.period}</span>
                                            <Badge variant="outline" className="text-xs">{edu.type}</Badge>
                                        </div>
                                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                                        <p className="text-muted-foreground">{edu.institution}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Experience */}
                        <Card className="shadow-card hover:shadow-glow transition-smooth animate-fade-in-up h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    Professional Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-primary/30 pl-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{exp.period}</span>
                                            <Badge variant="outline" className="text-xs">São Paulo - SP</Badge>
                                        </div>
                                        <h4 className="font-semibold text-lg">{exp.position}</h4>
                                        <p className="text-primary font-medium mb-3">{exp.company}</p>
                                        <ul className="space-y-1">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-primary mt-0.5 leading-none">•</span>
                                                    <span className="leading-relaxed">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card className="shadow-card hover:shadow-glow transition-smooth animate-fade-in-up h-fit bg-secondary/40 backdrop-blur-sm border border-border/50">
                            <CardHeader>
                                <CardTitle>Technical Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {Object.entries(skills).map(([category, techs]) => (
                                        <div key={category}>
                                            <h4 className="font-semibold mb-3 text-primary">{category}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="secondary"
                                                        className="hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
