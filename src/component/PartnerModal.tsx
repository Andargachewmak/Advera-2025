'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

export default function PartnerModal({
  allLogos,
  activeIndex,
  setActiveIndex,
  onClose,
}: PartnerModalProps) {
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(allLogos.length / itemsPerSlide);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide)
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isMobile && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) {
          setActiveIndex((prev) =>
            Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide)
          );
        } else {
          setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [itemsPerSlide, totalSlides, setActiveIndex, onClose, isMobile]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl mx-4 rounded-2xl px-6 py-10 sm:px-12 bg-white/20 backdrop-blur-md shadow-xl text-white overflow-auto max-h-[90vh] min-h-[300px]"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold"
              aria-label="Close Partner Modal"
            >
              ×
            </button>
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Clients</h1>
              <p className="text-xs sm:text-sm max-w-2xl text-white/80 mx-auto">
                We’re proud to collaborate with industry leaders who trust us to amplify their brand through innovation, strategy, and meaningful partnership.
              </p>
            </div>

            {/* Grid with AboutModal card style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allLogos.map((logo, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 min-h-[220px]"
                >
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="object-contain max-h-[100px]"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-4xl w-full mx-4 rounded-2xl px-6 py-10 sm:px-12 bg-white/20 backdrop-blur-md shadow-xl text-white overflow-hidden max-h-[90vh] min-h-[300px]"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          layout
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold"
            aria-label="Close Partner Modal"
          >
            ×
          </button>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Clients</h1>
            <p className="text-xs sm:text-sm max-w-2xl text-white/80 mx-auto">
              We’re proud to collaborate with industry leaders who trust us to amplify their brand through innovation, strategy, and meaningful partnership.
            </p>
          </div>

          <div className="overflow-hidden min-h-[250px]">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${(activeIndex / itemsPerSlide) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{ width: `${totalSlides * 100}%` }}
            >
              {allLogos.map((logo, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between flex-shrink-0 bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 min-h-[220px]"
                  style={{ flex: '0 0 calc(25% - 18px)' }}
                >
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="object-contain max-h-[100px]"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i * itemsPerSlide)}
                className={`w-2.5 h-2.5 rounded-full ${
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
