import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "€0",
      period: "forever",
      features: [
        "10 credits",
        "Watermarked downloads",
        "Limited access",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Creator",
      price: "€9",
      period: "per month",
      features: [
        "500 credits/month",
        "No watermarks",
        "Fast generation",
        "Priority support",
        "Commercial use",
      ],
      cta: "Start Creating",
      popular: true,
    },
    {
      name: "Pro",
      price: "€29",
      period: "per month",
      features: [
        "2000 credits/month",
        "No watermarks",
        "Text→Video access",
        "Priority generation",
        "Commercial use",
        "Advanced features",
      ],
      cta: "Go Pro",
      popular: false,
    },
    {
      name: "Studio",
      price: "€79",
      period: "per month",
      features: [
        "6000 credits/month",
        "All features",
        "API access",
        "Maximum priority",
        "Full commercial use",
        "Dedicated support",
        "Custom solutions",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const creditPacks = [
    { credits: 100, price: "€5" },
    { credits: 500, price: "€15" },
    { credits: 1000, price: "€25" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your creative needs. All plans include core AI features.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-border"
                } bg-card/50 backdrop-blur-sm`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 glow-primary"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Credit Packs */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Or Buy <span className="text-gradient">Credit Packs</span>
              </h2>
              <p className="text-muted-foreground">
                One-time purchases for extra credits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creditPacks.map((pack, index) => (
                <Card key={index} className="border-border hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-3xl font-bold">{pack.credits}</p>
                      <p className="text-sm text-muted-foreground">credits</p>
                    </div>
                    <p className="text-2xl font-bold mb-4">{pack.price}</p>
                    <Button className="w-full" variant="outline">
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
