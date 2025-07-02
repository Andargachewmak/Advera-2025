'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function PartnerModal({
  allLogos,
  activeIndex,
  setActiveIndex,
  onClose,
}: PartnerModalProps) {
  const itemsPerSlide = 4;
  const currentLogos = allLogos.slice(activeIndex, activeIndex + itemsPerSlide);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
          className="relative max-w-5xl w-full mx-4 rounded-2xl p-6 sm:p-11 md:p-12 bg-white/20 backdrop-blur-md shadow-xl text-white overflow-auto max-h-[90vh]"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white text-center">
              Our Clients
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl text-white/80 mx-auto text-center mb-10">
              We’re proud to collaborate with industry leaders who trust us to amplify their brand through innovation, strategy, and meaningful partnership.
            </p>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentLogos.map((logo, i) => (
              <div
                key={i}
                className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="mx-auto mb-4 object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: Math.ceil(allLogos.length / itemsPerSlide) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i * itemsPerSlide)}
                className={`w-2 h-2 rounded-full ${
                  i * itemsPerSlide === activeIndex ? 'bg-white' : 'bg-white/40'
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
