import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Description() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28 bg-secondary" aria-labelledby="description-title">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.h2
          id="description-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          {t("description", "title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          {t("description", "text")}
        </motion.p>
      </div>
    </section>
  );
}
