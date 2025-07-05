'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import {
  FaBook,
  FaGlobe,
  FaPalette,
  FaTags,
  FaLaptopCode,
} from 'react-icons/fa';
import { TbWriting } from 'react-icons/tb';

const services = [
  {
    title: 'Branding and Identity Design',
    icon: <FaTags size={32} className="text-yellow-400" />,
    description: 'Logos and brand guidelines that establish a strong visual identity.',
  },
  {
    title: 'Digital Marketing',
    icon: <FaGlobe size={32} className="text-blue-400" />,
    description: 'Social media post design to amplify your digital presence.',
  },
  {
    title: 'Content Creation',
    icon: <TbWriting size={32} className="text-red-400" />,
    description: 'Digital ads, banners, web campaigns, and print advertisements.',
  },
  {
    title: 'Web Development',
    icon: <FaLaptopCode size={32} className="text-green-400" />,
    description: 'Crafting seamless, dynamic websites that captivate your audience.',
  },
  {
    title: 'Print Design',
    icon: <FaBook size={32} className="text-pink-400" />,
    description: 'Brochures, posters, flyers, and packaging that leave a lasting impression.',
  },
  {
    title: 'Editorial Design',
    icon: <FaPalette size={32} className="text-purple-400" />,
    description: 'Layouts for magazines, books, and newspapers with editorial clarity.',
  },
];

export default function ServicesModal({ onClose }: { onClose: () => void }) {
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(services.length / itemsPerSlide);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile screen size
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
        setActiveIndex((prev) => Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide));
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
  }, [onClose, isMobile]);

  useEffect(() => {
    if (isMobile) return; // disable wheel on mobile (vertical scroll)
    const onWheel = (e: WheelEvent) => {
      if (wheelTimeoutRef.current) return;
      const scrollAmount = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (scrollAmount === 0) return;
      e.preventDefault();

      if (scrollAmount > 0) {
        setDirection(1);
        setActiveIndex((prev) => Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide));
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
  }, [itemsPerSlide, totalSlides, isMobile]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a1a1a]/90 backdrop-blur-sm"
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
            aria-label="Close Services Modal"
          >
            ×
          </button>

          {/* Heading + Description */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Services
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto text-white/80">
              Explore our comprehensive range of creative and technical services designed
              to bring your brand to life. From strategy to execution, we deliver
              impactful solutions tailored to your vision.
            </p>
          </div>

          {/* Show vertical list on mobile */}
          {isMobile ? (
            <div className="flex flex-col gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/90 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
          ) : (
            // Desktop/Table grid with animation and pagination
            <>
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
                  {services
                    .slice(activeIndex, activeIndex + itemsPerSlide)
                    .map((service) => (
                      <div
                        key={service.title}
                        className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                      >
                        <div className="mb-4 flex justify-center">{service.icon}</div>
                        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                        <p className="text-sm text-white/90 mt-2">{service.description}</p>
                      </div>
                    ))}
                </motion.div>
              </AnimatePresence>

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
