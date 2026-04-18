import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useI18n, type Locale } from '@/lib/i18n';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import one from '@/assets/gallery/01.jpg';
import two from '@/assets/gallery/02.jpg';
import three from '@/assets/gallery/03.jpg';
import four from '@/assets/gallery/04.jpg';
import five from '@/assets/gallery/05.jpg';
import six from '@/assets/gallery/06.jpg';
import seven from '@/assets/gallery/07.jpg';
import eight from '@/assets/gallery/08.jpg';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images: Array<{ src: string; alt: Record<Locale, string> }> = [
  { src: one, alt: { it: 'Soggiorno moderno e luminoso', en: 'Modern and bright living room' } },
  { src: two, alt: { it: 'Camera da letto luminosa e accogliente', en: 'Bright and cozy bedroom' } },
  { src: three, alt: { it: 'Cucina moderna e luminosa', en: 'Modern bright kitchen' } },
  { src: four, alt: { it: 'Cortile mediterraneo con piante', en: 'Mediterranean courtyard with plants' } },
  { src: five, alt: { it: 'Bagno elegante e moderno', en: 'Elegant modern bathroom' } },
  { src: six, alt: { it: 'Vacanza al mare con animali domestici', en: 'Beach vacation with pets' } },
  { src: seven, alt: { it: 'Ambiente accessibile e confortevole', en: 'Accessible and comfortable room' } },
  { src: eight, alt: { it: 'Arredamento moderno ed elegante', en: 'Modern and elegant interior design' } }
];

export function Gallery() {
  const { locale, t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);

  const next = () => {
    setSelected((prev) => (prev === null ? null : (prev + 1) % images.length));
  };

  const prev = () => {
    setSelected((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  };

  useEffect(() => {
    if (selected === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setSelected(null);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected]);

  return (
    <section id='gallery' className='py-20 md:py-28' aria-labelledby='gallery-title'>
      <div className='container mx-auto px-4'>
        <motion.h2
          id='gallery-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {t('gallery', 'title')}
        </motion.h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'>
          {images.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className={`overflow-hidden rounded-2xl cursor-pointer group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                i === 0 ? 'col-span-2 row-span-2' : i === 7 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
              }`}
              aria-label={img.alt[locale]}
            >
              <img
                src={img.src}
                alt={img.alt[locale]}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                loading='lazy'
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className='max-w-6xl w-full p-0 bg-transparent border-none shadow-none'>
          {selected !== null && (
            <div className='relative h-[80vh] flex items-center justify-center px-6'>
              <DialogTitle asChild>
                <VisuallyHidden>
                  <span>{images[selected].alt[locale]}</span>
                </VisuallyHidden>
              </DialogTitle>
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelected(null)}
                className='absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur transition'
                aria-label='Close gallery'
              >
                <X className='w-6 h-6' />
              </button>

              {/* IMAGE */}
              <motion.img
                key={selected}
                src={images[selected].src}
                alt={images[selected].alt[locale]}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className='max-h-full max-w-[90%] object-contain rounded-2xl shadow-2xl'
              />

              {/* PREV */}
              <button
                onClick={prev}
                className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur transition'
                aria-label='Previous image'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>

              {/* NEXT */}
              <button
                onClick={next}
                className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur transition'
                aria-label='Next image'
              >
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
