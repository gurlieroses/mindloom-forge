import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import example1 from "@/assets/example-1.jpg";
import example2 from "@/assets/example-2.jpg";
import example3 from "@/assets/example-3.jpg";

const ExamplesShowcase = () => {
  const examples = [
    {
      image: example1,
      title: "AI Portrait",
      prompt: "Futuristic cyberpunk portrait with neon lighting",
    },
    {
      image: example2,
      title: "Dreamscape",
      prompt: "Surreal floating islands in a purple alien world",
    },
    {
      image: example3,
      title: "Cyber City",
      prompt: "Neon-lit futuristic cityscape at night",
    },
  ];

  return (
    <section className="py-24 relative bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See What's <span className="text-gradient">Possible</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore stunning creations made by our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {examples.map((example, index) => (
            <Card key={index} className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{example.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{example.prompt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" variant="outline" className="border-border hover:bg-card">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExamplesShowcase;
