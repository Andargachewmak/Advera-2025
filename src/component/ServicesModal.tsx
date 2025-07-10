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
    title: 'Brand  Design',
    icon: <FaTags size={32} className="text-[#ee5225]/80" />,
    description: 'Logos and brand guidelines that establish a strong visual identity.',
  },
  {
    title: 'Digital Marketing',
    icon: <FaGlobe size={32} className="text-[#ee5225]/80" />,
    description: 'Social media post design and strategic content to amplify your digital presence.',
  },
  {
    title: 'Content Creation',
    icon: <TbWriting size={32} className="text-[#ee5225]/80" />,
    description: 'Digital ads, banners,web campaigns, and print advertisements.',
  },
  {
    title: 'Web Dev',
    icon: <FaLaptopCode size={32} className="text-[#ee5225]/80" />,
    description: 'Crafting seamless, dynamic websites that captivate your audience.',
  },
  {
    title: 'Print Design',
    icon: <FaBook size={32} className="text-[#ee5225]/80" />,
    description: 'Brochures, posters,  & packaging that leave a lasting impression.',
  },
  {
    title: 'Editorial Design',
    icon: <FaPalette size={32} className="text-[#ee5225]/80" />,
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
  }, [onClose, isMobile, totalSlides]);

  useEffect(() => {
    if (isMobile) return;
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
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
            aria-label="Close Services Modal"
          >
            ×
          </button>

          {/* Heading */}
          <div className="text-center mt-8 mb-12">
            <h2 className="text-[42px] sm:text-4xl font-bold text-white mb-3 whitespace-nowrap">
              Our Services
            </h2>
            <p className="text-white text-[15px] leading-[18px] max-w-3xl tracking-tighter mx-auto">
              Explore our comprehensive range of creative and technical services designed
              to bring your brand to life. From strategy to execution, we deliver
              impactful solutions tailored to your vision.
            </p>
          </div>

          {isMobile ? (
            <div className="grid grid-cols-1 gap-6 justify-items-center">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-[#4d4d4d]/35 rounded-2xl p-6 text-center w-[251px] h-[251px] hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-[21px] font-bold text-white">{service.title}</h3>
                  <p className="text-[15px] leading-[18px] text-white/90 mt-2">{service.description}</p>
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
                    {services
                      .slice(activeIndex, activeIndex + itemsPerSlide)
                      .map((service) => (
                        <div
                          key={service.title}
                          className="bg-[#4d4d4d]/35 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center w-[251px] h-[251px] flex flex-col items-center justify-center"
                        >
                          <div className="mb-4">{service.icon}</div>
                          <h3 className="text-[20px] font-bold text-white">{service.title}</h3>
                          <p className="text-[15px] leading-[18px] text-white/90 mt-2">
                            {service.description}
                          </p>
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
