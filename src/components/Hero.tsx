import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import heroImage from "@/assets/hero-beach.jpg";

export function Hero() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-hero-foreground leading-tight"
        >
          {t("hero", "title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-hero-foreground/90 max-w-2xl mx-auto leading-relaxed"
        >
          {t("hero", "subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="lg" onClick={() => scrollTo("#booking")}>
            {t("hero", "cta1")}
          </Button>
          <Button variant="heroOutline" size="lg" onClick={() => scrollTo("#features")}>
            {t("hero", "cta2")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
          aria-label="Badge"
        >
          {(["badgeBeach", "badgePet", "badgeAccessible"] as const).map((key) => (
            <span
              key={key}
              className="bg-hero-bg-hover backdrop-blur-sm text-hero-foreground text-sm px-4 py-2 rounded-full border border-hero-border"
            >
              {t("hero", key)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
