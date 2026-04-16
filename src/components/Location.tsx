import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Location() {
  const { t } = useI18n();

  return (
    <section id="location" className="py-20 md:py-28" aria-labelledby="location-title">
      <div className="container mx-auto px-4">
        <motion.h2
          id="location-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          <MapPin className="inline-block w-8 h-8 text-primary mr-2 align-middle" aria-hidden="true" />
          {t("location", "title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://maps.google.com/maps?q=San+Foca,+Lecce,+Italy&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa di San Foca, Salento"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("location", "description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
