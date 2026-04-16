import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useI18n, type Locale } from '@/lib/i18n';
import beachImage from '@/assets/gallery/beach-crystal.jpg';
import bedroomImage from '@/assets/gallery/bedroom.jpg';
import kitchenImage from '@/assets/gallery/kitchen.jpg';
import bathroomImage from '@/assets/gallery/bathroom.jpg';
import courtyardImage from '@/assets/gallery/courtyard.jpg';
import petImage from '@/assets/gallery/pet-beach.jpg';
import accessibleImage from '@/assets/gallery/accessible-room.jpg';

const images: Array<{ src: string; alt: Record<Locale, string> }> = [
  { src: beachImage, alt: { it: 'Spiaggia cristallina di San Foca', en: 'Crystal clear San Foca beach' } },
  { src: bedroomImage, alt: { it: 'Camera da letto luminosa e accogliente', en: 'Bright and cozy bedroom' } },
  { src: kitchenImage, alt: { it: 'Cucina moderna e luminosa', en: 'Modern bright kitchen' } },
  { src: courtyardImage, alt: { it: 'Cortile mediterraneo con piante', en: 'Mediterranean courtyard with plants' } },
  { src: bathroomImage, alt: { it: 'Bagno elegante e moderno', en: 'Elegant modern bathroom' } },
  { src: petImage, alt: { it: 'Vacanza al mare con animali domestici', en: 'Beach vacation with pets' } },
  { src: accessibleImage, alt: { it: 'Ambiente accessibile e confortevole', en: 'Accessible and comfortable room' } }
];

export function Gallery() {
  const { locale, t } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);

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
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
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
        <DialogContent className='max-w-4xl p-2 bg-card border-none rounded-2xl'>
          {selected !== null && (
            <img src={images[selected].src} alt={images[selected].alt[locale]} className='w-full h-auto rounded-xl' />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
