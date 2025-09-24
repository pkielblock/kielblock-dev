import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Smartphone, Globe, Database } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include real-time inventory, admin dashboard, and mobile-responsive design.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      type: "Web Application",
      icon: <Globe className="h-5 w-5" />,
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, team collaboration features, and advanced analytics dashboard.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Redis"],
      type: "SaaS Product",
      icon: <Database className="h-5 w-5" />,
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking with workout plans, progress analytics, and social sharing features.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      technologies: ["React Native", "Firebase", "GraphQL", "TypeScript"],
      type: "Mobile App",
      icon: <Smartphone className="h-5 w-5" />,
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered content creation tool that helps businesses generate marketing copy, blog posts, and social media content.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["Python", "FastAPI", "OpenAI API", "React", "Docker"],
      type: "AI Application",
      icon: <Database className="h-5 w-5" />,
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
            Featured <span className="gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 gradient-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my recent work, ranging from full-stack web applications to mobile apps and AI-powered solutions.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card key={project.title} className="group overflow-hidden shadow-card hover:shadow-glow transition-smooth animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-smooth" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {project.icon}
                  <span className="text-sm text-muted-foreground">{project.type}</span>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="cta" size="sm" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={project.title} className="group shadow-card hover:shadow-glow transition-smooth animate-fade-in-up" style={{ animationDelay: `${(index + 2) * 150}ms` }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon}
                    <span className="text-sm text-muted-foreground">{project.type}</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
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

export default Projects;
