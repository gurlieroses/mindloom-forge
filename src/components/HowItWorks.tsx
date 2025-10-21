import { Pencil, Wand2, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Pencil,
      title: "Write",
      description: "Describe what you want to create with a simple text prompt.",
      color: "text-primary",
    },
    {
      icon: Wand2,
      title: "Generate",
      description: "Watch as AI transforms your words into stunning visuals and content.",
      color: "text-accent",
    },
    {
      icon: Share2,
      title: "Share",
      description: "Download, share, and showcase your AI-generated creations with the world.",
      color: "text-primary-glow",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional content in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="absolute -top-4 left-6 bg-background border border-border rounded-full w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg font-bold text-primary">{index + 1}</span>
                  </div>
                  
                  <div className={`mt-8 mb-4 ${step.color}`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
