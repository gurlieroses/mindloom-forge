import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Start for Free Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="text-gradient">Creative Vision?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of creators using Mindloom to bring their imagination to life. 
            Get started with 10 free credits — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary text-lg px-8 py-6">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-card">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>10 free credits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-glow" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
