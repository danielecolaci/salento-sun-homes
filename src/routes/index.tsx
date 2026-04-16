import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Description } from "@/components/Description";
import { Location } from "@/components/Location";
import { BookingForm } from "@/components/BookingForm";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "San Foca Vacanze — Case Vacanze a 150m dal Mare nel Salento" },
      {
        name: "description",
        content:
          "4 accoglienti case vacanze a San Foca, nel Salento, a 150 metri dal mare. Pet friendly, accessibili, perfette per famiglie e gruppi. Prenota la tua estate!",
      },
      { property: "og:title", content: "San Foca Vacanze — Case Vacanze nel Salento" },
      {
        property: "og:description",
        content: "4 case vacanze a 150m dal mare di San Foca. Pet friendly, accessibili, perfette per famiglie.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Features />
        <Gallery />
        <Description />
        <Location />
        <BookingForm />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
