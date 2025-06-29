'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { FaBook, FaGlobe, FaPalette, FaTags, FaLaptopCode } from 'react-icons/fa';
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
    title: 'Web development',
    icon: <FaLaptopCode size={32} className="text-green-400" />,
    description: 'Signage, billboards, and exhibition designs that make spaces speak.',
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

const borderRadius = 8;
const strokeWidth = 2;
const halfStroke = strokeWidth / 2;
const strokeDasharray = 384;

export default function ServicesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl p-6 sm:p-11 md:p-12 bg-white/20 backdrop-blur-md shadow-lg"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          layout
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold transition"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">
            Our Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                className="relative bg-white/10 cursor-pointer"
                style={{
                  borderRadius,
                  padding: 24,
                }}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* Animated SVG border on outer edge */}
                <svg
                  className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] z-0 pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ borderRadius }}
                >
                  <defs>
                    <linearGradient id={`grad-service-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#61dafb" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#61dafb" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#61dafb" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  <motion.rect
                    x={halfStroke}
                    y={halfStroke}
                    width={100 - strokeWidth}
                    height={100 - strokeWidth}
                    rx={borderRadius}
                    ry={borderRadius}
                    fill="none"
                    stroke={`url(#grad-service-${idx})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDasharray}
                    filter="url(#glow)"
                    variants={{
                      rest: { opacity: 0 },
                      hover: {
                        opacity: 1,
                        strokeDashoffset: 0,
                        transition: {
                          duration: 4,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'linear',
                        },
                      },
                    }}
                  />
                </svg>

                {/* Content centered */}
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-white/90 mt-2">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
