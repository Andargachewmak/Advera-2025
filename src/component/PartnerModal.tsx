'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

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

const itemsPerSlide = 3;

import { easeInOut } from 'framer-motion';

const slideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeInOut },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.5, ease: easeInOut },
  }),
};

export default function PartnerModal({
  allLogos,
  activeIndex,
  setActiveIndex,
  onClose,
}: PartnerModalProps) {
  const totalSlides = Math.ceil(allLogos.length / itemsPerSlide);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 1024);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isMobile) {
        setDirection(1);
        setActiveIndex((prev) =>
          Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide)
        );
      } else if (e.key === 'ArrowLeft' && !isMobile) {
        setDirection(-1);
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobile, setActiveIndex, onClose]);

  useEffect(() => {
    if (isMobile) return;
    const onWheel = (e: WheelEvent) => {
      const scrollAmount = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (scrollAmount === 0) return;
      e.preventDefault();
      if (wheelTimeoutRef.current) return;

      if (scrollAmount > 0) {
        setDirection(1);
        setActiveIndex((prev) =>
          Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide)
        );
      } else if (scrollAmount < 0) {
        setDirection(-1);
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      }

      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 400);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [isMobile, setActiveIndex]);

  const renderLogoCard = (logo: Logo, i: number) => (
    <div
      key={i}
      className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center min-h-[220px]"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className="object-contain max-h-[100px] mx-auto"
        draggable={false}
      />
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl p-6 sm:p-11 md:p-12 bg-white/20 backdrop-blur-md shadow-xl"
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight text-white">
              Our Clients
            </h1>
            <p className="text-sm sm:text-base max-w-2xl mx-auto text-white/80 leading-relaxed">
              Explore our trusted partnerships with leading organizations and visionary brands.
              Their belief in our process fuels the collaboration that drives innovation, growth,
              and mutual success.
            </p>
          </div>

          {isMobile ? (
            <div className="flex flex-col gap-6">
              {allLogos.map((logo, i) => (
                <div
                  key={i}
                  className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="mb-4 flex justify-center">
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
          ) : (
            <>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={slideVariants}
                  custom={direction}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {allLogos
                  .slice(activeIndex, activeIndex + itemsPerSlide)
                  .map((logo, i) => (
                    <div key={activeIndex + i}>
                    {renderLogoCard(logo, activeIndex + i)}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => {
                  const newIndex = i * itemsPerSlide;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(newIndex > activeIndex ? 1 : -1);
                        setActiveIndex(newIndex);
                      }}
                      className={`w-2.5 h-2.5 rounded-full ${
                        newIndex === activeIndex
                          ? 'bg-white'
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
