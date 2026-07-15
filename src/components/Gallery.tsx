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
  /** Optional small label above the title (e.g. an apartment name), styled with the caller's accent color. */
  eyebrow?: string;
  eyebrowClassName?: string;
  /** Always exactly 8 photos in practice, which drives the editorial grid below. */
  images: GalleryImage[];
}

/**
 * Photo grid + lightbox shared by the Home gallery and every apartment detail page,
 * so all three present the exact same browsing experience with their own photos.
 */
export function Gallery({ id, title, eyebrow, eyebrowClassName, images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  if (images.length === 0) return null;

  const next = () => setSelected((prev) => (prev === null ? null : (prev + 1) % images.length));
  const prev = () => setSelected((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));

  return (
    <section id={id} className='py-20 md:py-28' aria-labelledby={`${id}-title`}>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          {eyebrow && (
            <span className={`text-sm font-semibold tracking-wide uppercase ${eyebrowClassName ?? 'text-primary'}`}>
              {eyebrow}
            </span>
          )}
          <h2 id={`${id}-title`} className='mt-2 text-3xl font-bold tracking-tight md:text-4xl'>
            {title}
          </h2>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'>
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(i)}
              className={`group cursor-pointer overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/60 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
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
