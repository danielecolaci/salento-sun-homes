import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import heroImage from "@/assets/hero-beach.jpg";

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-labelledby="final-cta-title">
      <div className="absolute inset-0" aria-hidden="true">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h2
          id="final-cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-hero-foreground mb-8"
        >
          {t("finalCta", "title")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Button
            variant="hero"
            size="lg"
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("finalCta", "button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
