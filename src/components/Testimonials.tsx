import { motion } from "framer-motion";
import { Star, Heart, PawPrint, Accessibility, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const typeIcons: Record<string, React.ElementType> = {
  family: Users,
  pet: PawPrint,
  accessible: Accessibility,
  couple: Heart,
};

export function Testimonials() {
  const { t, tArray } = useI18n();
  const items = tArray("testimonials", "items");

  return (
    <section id="testimonials" className="py-20 md:py-28" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4">
        <motion.h2
          id="testimonials-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {t("testimonials", "title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => {
            const Icon = typeIcons[item.type] || Star;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex gap-1 mb-3" aria-label="5 stelle su 5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">&ldquo;{item.text}&rdquo;</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
