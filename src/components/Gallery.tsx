import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbox } from '@/components/ui/lightbox';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  /** Section id, also used to derive the heading id (e.g. "gallery" -> "gallery-title"). */
  id: string;
  title: string;
  /** Always exactly 8 photos in practice, which drives the editorial grid below. */
  images: GalleryImage[];
}

/**
 * Photo grid + lightbox shared by the Home gallery and every apartment detail page,
 * so all three present the exact same browsing experience with their own photos.
 */
export function Gallery({ id, title, images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) return null;

  const next = () => setSelected((prev) => (prev === null ? null : (prev + 1) % images.length));
  const prev = () => setSelected((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));

  return (
    <section id={id} className='py-20 md:py-28' aria-labelledby={`${id}-title`}>
      <div className='container mx-auto px-4'>
        <motion.h2
          id={`${id}-title`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {title}
        </motion.h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'>
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className={`overflow-hidden rounded-2xl cursor-pointer group focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                i === 0 ? 'col-span-2 row-span-2' : i === 7 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
              }`}
              aria-label={img.alt}
            >
              <img
                src={img.src}
                alt={img.alt}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                loading='lazy'
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox images={images} index={selected} onClose={() => setSelected(null)} onNext={next} onPrev={prev} />
    </section>
  );
}
