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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold"
              aria-label="Close About Modal"
            >
              ×
            </button>

            {/* Content */}
            <div className="space-y-12 text-left">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h1>
                <p className="text-white text-sm max-w-3xl leading-relaxed">
                  We are the dynamic hub for marketing, communication, and brands. Committed to achieving your goals,
                  we provide creative and impactful marketing and communication plans that resonate with your target
                  market and elevate your business.
                </p>
              </div>

              {/* Card Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
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
                ].map(({ title, text }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between h-full min-h-[220px] bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
                      <p className="text-white text-xs leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
