import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const navLinks = [
    { to: "/studio", label: "Studio" },
    { to: "/gallery", label: "Gallery" },
    { to: "/pricing", label: "Pricing" },
    { to: "/learn", label: "Learn" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 glow-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-gradient">Mindloom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">10 credits</span>
            </div>
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-primary hover:bg-primary/90 glow-primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border mb-4">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">10 credits</span>
                  </div>
                  <Link to="/auth" className="block mb-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" className="block">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
