import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — San Foca Vacanze" },
      { name: "description", content: "Informativa sulla privacy di San Foca Vacanze." },
      { property: "og:title", content: "Privacy Policy — San Foca Vacanze" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { locale } = useI18n();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/" className="text-primary hover:underline text-sm mb-8 inline-block">
          &larr; Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        {locale === "it" ? (
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              La presente informativa descrive come San Foca Vacanze raccoglie e utilizza i dati
              personali forniti attraverso il modulo di richiesta disponibilità.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Dati raccolti</h2>
            <p>
              Raccogliamo: nome, email, date di soggiorno, numero di ospiti e preferenze relative ad
              animali domestici e accessibilità.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Finalità</h2>
            <p>
              I dati vengono utilizzati esclusivamente per rispondere alle richieste di disponibilità
              e gestire le prenotazioni.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Conservazione</h2>
            <p>
              I dati vengono conservati per il tempo necessario a gestire la richiesta e
              successivamente cancellati.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Contatti</h2>
            <p>
              Per qualsiasi richiesta relativa ai tuoi dati personali:{" "}
              <a href="mailto:info@casevacanzesanfoca.it" className="text-primary hover:underline">
                info@casevacanzesanfoca.it
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              This policy describes how San Foca Vacanze collects and uses personal data provided
              through the availability request form.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Data collected</h2>
            <p>
              We collect: name, email, stay dates, number of guests and preferences regarding pets
              and accessibility.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Purpose</h2>
            <p>
              Data is used exclusively to respond to availability requests and manage bookings.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Retention</h2>
            <p>
              Data is retained for the time necessary to manage the request and subsequently deleted.
            </p>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              For any request regarding your personal data:{" "}
              <a href="mailto:info@casevacanzesanfoca.it" className="text-primary hover:underline">
                info@casevacanzesanfoca.it
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
