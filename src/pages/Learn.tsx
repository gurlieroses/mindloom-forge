import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Video, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Learn = () => {
  const tutorials = [
    {
      icon: Lightbulb,
      title: "How to Write Powerful Prompts",
      description: "Master the art of crafting prompts that generate stunning results every time.",
      category: "Beginner",
      readTime: "5 min read",
    },
    {
      icon: Video,
      title: "Creating Videos with AI",
      description: "Step-by-step guide to generating professional videos from text descriptions.",
      category: "Intermediate",
      readTime: "8 min read",
    },
    {
      icon: BookOpen,
      title: "Best Ideas for Social Media Posts",
      description: "Discover creative ways to use AI for engaging social media content.",
      category: "Advanced",
      readTime: "10 min read",
    },
    {
      icon: Lightbulb,
      title: "Understanding AI Art Styles",
      description: "Learn about different artistic styles and how to apply them to your creations.",
      category: "Beginner",
      readTime: "6 min read",
    },
    {
      icon: Video,
      title: "Advanced Image Editing Techniques",
      description: "Take your creations to the next level with advanced editing methods.",
      category: "Advanced",
      readTime: "12 min read",
    },
    {
      icon: BookOpen,
      title: "Monetizing Your AI Creations",
      description: "Turn your AI-generated content into a source of income.",
      category: "Intermediate",
      readTime: "7 min read",
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
                Learn & <span className="text-gradient">Master</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock your creative potential with our comprehensive guides and tutorials
              </p>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tutorials.map((tutorial, index) => {
                const Icon = tutorial.icon;
                return (
                  <Card key={index} className="group border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {tutorial.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {tutorial.readTime}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {tutorial.description}
                      </p>
                      
                      <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Start Creating?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Put your new knowledge into practice. Start creating stunning content with AI today.
                </p>
                <Link to="/studio">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary">
                    Explore the Studio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
