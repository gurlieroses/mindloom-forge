import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border backdrop-blur-sm mb-6 animate-glow">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI-Powered Creativity Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Weave Your Imagination
          <br />
          <span className="text-gradient">Into Reality</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate stunning images, videos, and text with cutting-edge AI technology. 
          Transform your ideas into extraordinary content in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/studio">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6">
              Start Creating for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/gallery">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-card">
              Explore Gallery
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>10 free credits</span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
