import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

// Import delle immagini
import img1 from "@/assets/hero/01.webp";
import img2 from "@/assets/hero/02.webp";
import img3 from "@/assets/hero/03.webp";
import img4 from "@/assets/hero/04.webp";

const images = [img1, img2, img3, img4];

export function Hero() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logica per il cambio immagine ogni 5 secondi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background Slideshow */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }} // "Transizione dolce"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Overlay per leggibilità testo */}
        <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
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
      </div>
    </section>
  );
}