import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Mail, MapPin, Menu, PawPrint, Phone, X } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Available Pets", to: "/pets" },
  { label: "Adopt", to: "/process" },
  { label: "Success Stories", to: "/stories" },
  { label: "Blog", to: "/blog" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-card border-b border-border shadow-xs sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold text-xl text-primary transition-smooth hover:opacity-80"
          data-ocid="nav.logo_link"
        >
          <PawPrint className="w-7 h-7 text-secondary" strokeWidth={2} />
          <span>AdoptPaws</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            data-ocid="nav.adopt_cta_button"
          >
            <Link to="/pets">Find a Pet</Link>
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-smooth"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-ocid="nav.mobile_menu_toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden bg-card border-t border-border shadow-lg"
          data-ocid="nav.mobile_menu"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-smooth
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-border">
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                data-ocid="nav.mobile_adopt_cta_button"
              >
                <Link to="/pets" onClick={() => setOpen(false)}>
                  Find a Pet
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-semibold text-lg text-primary mb-3"
            >
              <PawPrint className="w-6 h-6 text-secondary" strokeWidth={2} />
              <span>AdoptPaws</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Connecting loving families with pets who need a second chance.
              Every adoption changes two lives.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-smooth"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Adopt
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Available Pets", to: "/pets" },
                { label: "Adoption Process", to: "/process" },
                { label: "Apply to Adopt", to: "/adopt" },
                { label: "Success Stories", to: "/stories" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Volunteer", to: "/get-involved" },
                { label: "Foster a Pet", to: "/get-involved" },
                { label: "Donate", to: "/get-involved" },
                { label: "Blog & Resources", to: "/blog" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
                <span>123 Paws Lane, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0 text-secondary" />
                <a
                  href="tel:+14155550123"
                  className="hover:text-primary transition-smooth"
                >
                  (415) 555-0123
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-secondary" />
                <a
                  href="mailto:hello@adoptpaws.org"
                  className="hover:text-primary transition-smooth"
                >
                  hello@adoptpaws.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-accent" />
            <span>© {year} AdoptPaws. All rights reserved.</span>
          </div>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
}
