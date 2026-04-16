import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground text-primary-foreground py-16" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">San Foca Vacanze</h3>
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Badge">
              <span className="text-xs bg-primary-foreground/10 px-3 py-1 rounded-full">
                🐾 {t("footer", "badgePet")}
              </span>
              <span className="text-xs bg-primary-foreground/10 px-3 py-1 rounded-full">
                ♿ {t("footer", "badgeAccessible")}
              </span>
              <span className="text-xs bg-primary-foreground/10 px-3 py-1 rounded-full">
                🏖️ {t("footer", "badgeBeach")}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer", "contact")}</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <a
                href={`mailto:${t("footer", "email")}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {t("footer", "email")}
              </a>
              <a
                href={`tel:${t("footer", "phone").replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t("footer", "phone")}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer", "social")}</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} San Foca Vacanze. {t("footer", "rights")}</p>
          <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
            {t("footer", "privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
