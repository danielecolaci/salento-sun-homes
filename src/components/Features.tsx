import { motion } from "framer-motion";
import { Waves, Users, Car, PawPrint, Accessibility, ShieldCheck, Store, Baby, Footprints, TreePine } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const iconMap: Record<string, React.ElementType> = {
  waves: Waves,
  users: Users,
  car: Car,
  paw: PawPrint,
  accessible: Accessibility,
  shield: ShieldCheck,
  store: Store,
  baby: Baby,
  footprints: Footprints,
  tree: TreePine,
};

export function Features() {
  const { t, tArray } = useI18n();
  const items = tArray("features", "items");

  return (
    <section id="features" className="py-20 md:py-28 bg-secondary" aria-labelledby="features-title">
      <div className="container mx-auto px-4">
        <motion.h2
          id="features-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          {t("features", "title")}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || Waves;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-card rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
