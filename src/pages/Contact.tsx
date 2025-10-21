import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      question: "How do credits work?",
      answer: "Credits are used to generate content. Each generation type costs a different amount of credits.",
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time from your account settings.",
    },
    {
      question: "What happens to my unused credits?",
      answer: "Unused credits roll over to the next month for paid plans. Free plan credits don't roll over.",
    },
    {
      question: "Can I use generated content commercially?",
      answer: "Creator plans and above include commercial use rights for all generated content.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We're here to help!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Form */}
              <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    Send us a Message
                  </h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        className="min-h-32 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Mail className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Get help from our support team
                    </p>
                    <a href="mailto:support@mindloom.ai" className="text-primary hover:underline text-sm">
                      support@mindloom.ai
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <HelpCircle className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground text-sm">
                      We typically respond within 24 hours during business days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
