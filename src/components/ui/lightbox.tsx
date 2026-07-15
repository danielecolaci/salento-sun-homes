import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/** Fullscreen keyboard-navigable image viewer, shared by every gallery in the app. */
export function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index, onNext, onPrev, onClose]);

  return (
    <Dialog open={index !== null} onOpenChange={onClose}>
      <DialogContent className='max-w-6xl w-full p-0 bg-transparent border-none shadow-none'>
        {index !== null && (
          <div className='relative h-[80vh] flex items-center justify-center px-6'>
            <DialogTitle asChild>
              <VisuallyHidden>
                <span>{images[index].alt}</span>
              </VisuallyHidden>
            </DialogTitle>

            <button
              onClick={onClose}
              className='absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur transition'
              aria-label='Close gallery'
            >
              <X className='w-6 h-6' />
            </button>

            <AnimatePresence mode='wait'>
              <motion.img
                key={index}
                src={images[index].src}
                alt={images[index].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className='max-h-full max-w-[90%] object-contain rounded-2xl shadow-2xl'
              />
            </AnimatePresence>

            <button
              onClick={onPrev}
              className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur transition'
              aria-label='Previous image'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>

            <button
              onClick={onNext}
              className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur transition'
              aria-label='Next image'
            >
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
