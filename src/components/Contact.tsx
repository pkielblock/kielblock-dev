import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                toast.success("Message sent successfully! I'll get back to you soon.");
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            toast.error("Failed to send message. Please try again or email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-secondary/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                        Get In <span className="gradient-primary bg-clip-text text-transparent">Touch</span>
                    </h2>
                    <div className="w-20 h-1 gradient-primary mx-auto mb-6 rounded-full" />
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Want to Hire Me? Let's discuss how we can bring your ideas to life.
                        I'm always excited to work on new challenges.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Whether you're looking to build a new project from scratch, need help with
                                an existing application, or just want to discuss potential opportunities,
                                I'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground group-hover:shadow-glow transition-smooth">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a
                                        href="mailto:pedro@kielblock.dev"
                                        className="text-muted-foreground hover:text-primary transition-smooth"
                                    >
                                        pedro@kielblock.dev
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground group-hover:shadow-glow transition-smooth">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <span className="text-muted-foreground">Santo André - SP, Brazil</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <h4 className="font-medium mb-4">Response Time</h4>
                            <p className="text-muted-foreground">
                                I typically respond to messages within 24 hours. For urgent inquiries,
                                feel free to call or reach out on LinkedIn.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="shadow-card hover:shadow-glow transition-smooth animate-slide-in-right">
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and I'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6" action="https://formspree.io/f/manpygaq" method="POST">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Your name"
                                            required
                                            className="transition-smooth focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            className="transition-smooth focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Project discussion, collaboration, etc."
                                        required
                                        className="transition-smooth focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project or inquiry..."
                                        className="min-h-[120px] transition-smooth focus:ring-primary"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="hero"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Contact;