'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const cards = [
    {
      title: 'The Spark to Ignite Your Ideas',
      text: 'Ever had a brilliant idea you can’t quite express? At Advera, we transform your vision into reality—often before you can finish the thought.',
    },
    {
      title: 'Teamwork Makes the Dream Work',
      text: 'At Advera, collaboration drives every project. Our team ensures every detail is crafted thoughtfully because, as the saying goes, the sum is greater than the parts.',
    },
    {
      title: 'Precision or Passion?',
      text: 'We’re never satisfied with “good enough.” Every idea and word is crafted with care to reflect your vision perfectly. We ensure your brand is polished and ready to captivate.',
    },
  ];

  const strokeDasharray = 384;
  const borderRadius = 8; // px for card border-radius
  const strokeWidth = 2; // stroke width in px
  const halfStroke = strokeWidth / 2; // 1

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-4xl w-full mx-4 rounded-2xl px-6 py-11 sm:px-12 bg-white/20 backdrop-blur-md shadow-xl text-white overflow-auto max-h-[90vh]"
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
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold transition-colors"
              aria-label="Close About Modal"
            >
              ×
            </button>

            {/* Content */}
            <div className="space-y-12 text-left">
              <div className="mb-25">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h1>
                <p className="text-white text-sm max-w-3xl leading-relaxed">
                  We are the dynamic hub for marketing, communication, and brands. Committed to achieving your goals,
                  we provide creative and impactful marketing and communication plans that resonate with your target market and elevate your business.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map(({ title, text }, idx) => (
                  <motion.div
                    key={idx}
                    className="relative bg-black/20 backdrop-blur-md"
                    style={{
                      borderRadius: borderRadius,
                      padding: 24,
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {/* SVG border exactly on outer edge */}
                    <svg
                      className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] z-0 pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ borderRadius }}
                    >
                      <defs>
                        <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                        stroke={`url(#grad-${idx})`}
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

                    <h2 className="text-lg text-white font-bold mb-2 relative z-10">{title}</h2>
                    <p className="text-white text-xs relative z-10">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
