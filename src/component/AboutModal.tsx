'use client';

import { motion, AnimatePresence } from 'framer-motion';

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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-2xl w-full mx-4 rounded-2xl p-6 sm:p-8 bg-white/20 backdrop-blur-md shadow-lg text-white"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              About Us
            </h1>
            <p className="text-white/90 text-base mb-4 text-center">
              We’re a passionate team of creatives and engineers, dedicated to building outstanding digital experiences.
            </p>
            <p className="text-white/70 text-sm text-center">
              Our mission is to blend design and technology into solutions that empower brands and engage users.
              Let’s build something amazing together.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
