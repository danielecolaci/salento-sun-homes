import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t("nav", "features"), href: "#features" },
    { label: t("nav", "gallery"), href: "#gallery" },
    { label: t("nav", "location"), href: "#location" },
    { label: t("nav", "booking"), href: "#booking" },
    { label: t("nav", "testimonials"), href: "#testimonials" },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`font-heading text-xl font-bold transition-colors ${
            scrolled ? "text-foreground" : "text-hero-foreground"
          }`}
        >
          San Foca Vacanze
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Navigazione principale">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-hero-foreground hover:text-hero-foreground/80"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "it" ? "en" : "it")}
            className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
              scrolled
                ? "border-border text-foreground hover:bg-muted"
                : "border-hero-border text-hero-foreground hover:bg-hero-bg-hover"
            }`}
            aria-label={`Switch to ${locale === "it" ? "English" : "Italiano"}`}
          >
            {locale === "it" ? "EN" : "IT"}
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Apri menu">
                <Menu className={scrolled ? "text-foreground" : "text-hero-foreground"} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Menu mobile">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="text-lg font-medium text-foreground hover:text-primary text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
