'use client';

import { motion, AnimatePresence, easeInOut } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Detect screen size
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 1024);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isMobile) {
        setActiveIndex((prev) =>
          Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide)
        );
      } else if (e.key === 'ArrowLeft' && !isMobile) {
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMobile, setActiveIndex, onClose]);

  // Auto-slide on desktop
  useEffect(() => {
    if (isMobile) return;
    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) =>
        prev + itemsPerSlide >= allLogos.length ? 0 : prev + itemsPerSlide
      );
    }, 4000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [isMobile, allLogos.length, setActiveIndex]);

  const renderLogoCard = (logo: Logo, i: number) => (
    <div
      key={i}
      className="bg-[#4d4d4d]/35 ml-2.5  rounded-2xl p-6 hover:shadow-lg transition-shadow duration-100 flex items-center justify-center min-h-[220px] w-[251px] h-[251px]"
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
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a1a1a]/92 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative  overflow-auto rounded-3xl p-6 sm:p-11 md:p-12 bg-black/38 "
           style={{ width: '974.4px', height: '611.1px', padding: '42.78px 58.46px' }}
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          layout
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
            aria-label="Close Partner Modal"
          >
            ×
          </button>

          <div className="text-center mt-10 mb-22">
            <h1 className="text-[42px] sm:text-4xl font-bold mb-3 leading-tight text-white">
              Our Clients
            </h1>
            <p className="text-[15px] sm:text-[15px] max-w-2xl mx-auto text-white/80 leading-[18px]">
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
                  className="bg-[#4d4d4d]/35  rounded-2xl p-6  duration-300 text-center w-[251px] h-[251px] "
                >
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="object-contain max-h-[100px] "
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="relative min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{
                      scale: 0.98,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                    }}
                    animate={{
                      scale: 1,
                      transition: { duration: 0.4, ease: easeInOut },
                    }}
                    exit={{
                      scale: 0.98,
                      transition: { duration: 0.3, ease: easeInOut },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              </div>

              {/* Pagination Dots */}
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => {
                  const newIndex = i * itemsPerSlide;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(newIndex)}
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
