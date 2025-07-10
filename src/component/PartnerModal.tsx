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

export default function PartnerModal({
  allLogos,
  activeIndex,
  setActiveIndex,
  onClose,
}: PartnerModalProps) {
  const totalSlides = Math.ceil(allLogos.length / itemsPerSlide);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 1024);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [onClose, isMobile, setActiveIndex, totalSlides]);

  useEffect(() => {
    if (isMobile) return; // Disable wheel on mobile
    const onWheel = (e: WheelEvent) => {
      if (wheelTimeoutRef.current) return;
      const scrollAmount = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (scrollAmount === 0) return;
      e.preventDefault();

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
    };
  }, [totalSlides, isMobile, setActiveIndex]);

  return (
    <AnimatePresence>
      {/* Backdrop and modal container */}
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a1a1a]/92 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        }}
      >
        <motion.div
          className="relative rounded-3xl p-6 sm:p-11 md:p-12 bg-black/38 flex flex-col justify-between overflow-y-auto"
          style={{ width: '974.4px', height: '611.1px', padding: '42.78px 58.46px' }}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
            exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
          }}
          layout
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
            aria-label="Close Partner Modal"
          >
            ×
          </button>

          {/* Heading */}
          <div className="text-center mt-8 mb-12">
            <h2 className="text-[42px] sm:text-4xl font-bold text-white mb-3">Our Clients</h2>
            <p className="text-white text-[15px] leading-[18px] max-w-3xl tracking-tighter mx-auto">
              Trusted by top brands and visionary partners who help us shape bold ideas into impactful
              results, fueling innovation and creating meaningful change across industries worldwide.
            </p>
          </div>

          {/* Cards grid */}
          {isMobile ? (
            <div className="grid grid-cols-1 gap-6 justify-items-center">
              {allLogos.map((logo, i) => (
                <div
                  key={i}
                  className="bg-[#4d4d4d]/35 rounded-2xl p-6 flex items-center justify-center w-[251px] h-[251px] shrink-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain max-w-[180px] max-h-[100px]"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex-grow flex items-center justify-center" style={{ height: 270 }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { x: direction > 0 ? 300 : -300, opacity: 0 },
                      visible: {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.5, ease: 'easeInOut' },
                      },
                      exit: {
                        x: direction > 0 ? -300 : 300,
                        opacity: 0,
                        transition: { duration: 0.5, ease: 'easeInOut' },
                      },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {allLogos
                      .slice(activeIndex, activeIndex + itemsPerSlide)
                      .map((logo, i) => (
                        <div
                          key={i}
                          className="bg-[#4d4d4d]/35 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center w-[251px] h-[251px]"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className="object-contain max-w-[180px] max-h-[100px]"
                            draggable={false}
                          />
                        </div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot navigation */}
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const newIndex = i * itemsPerSlide;
                      setDirection(newIndex > activeIndex ? 1 : -1);
                      setActiveIndex(newIndex);
                    }}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i * itemsPerSlide === activeIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
