'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
};

type PartnerModalProps = {
  allLogos: Logo[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function PartnerModal({
  allLogos,
  activeIndex,
  setActiveIndex,
  onClose,
}: PartnerModalProps) {
  const currentLogos = allLogos.slice(activeIndex, activeIndex + 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 4) % allLogos.length);
    }, 4000);

    document.body.style.overflow = 'hidden';
    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [allLogos.length, setActiveIndex]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full mx-4 rounded-xl px-4 py-8 sm:px-8 bg-white/20 backdrop-blur-md shadow-xl text-white overflow-auto max-h-[90vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          layout
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold"
            aria-label="Close Partner Modal"
          >
            ×
          </button>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Our Clients</h1>
            <p className="text-xs sm:text-sm max-w-2xl text-white/80">
              We’re proud to collaborate with industry leaders who trust us to amplify their brand through innovation, strategy, and meaningful partnership.
            </p>
          </div>

          {/* Logos Grid: 2 columns on mobile, 4 on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentLogos.map((logo, i) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 backdrop-blur-md rounded-xl p-3 text-center hover:shadow-md transition-shadow duration-200"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-12 w-auto mx-auto mb-2 object-contain"
                />
                {logo.description && (
                  <p className="text-[0.65rem] leading-tight text-white/80">
                    {logo.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: Math.ceil(allLogos.length / 4) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i * 4)}
                className={`w-2 h-2 rounded-full ${
                  i * 4 === activeIndex ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
