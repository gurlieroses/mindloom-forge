import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { to: "/studio", label: "Studio" },
        { to: "/gallery", label: "Gallery" },
        { to: "/pricing", label: "Pricing" },
        { to: "/learn", label: "Learn" },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/community", label: "Community" },
      ],
    },
    {
      title: "Resources",
      links: [
        { to: "/learn", label: "Tutorials" },
        { to: "/contact", label: "Support" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-gradient">Mindloom</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Weave your imagination into reality with AI-powered creativity.
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Mindloom. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
