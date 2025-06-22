'use client';

import { motion, AnimatePresence } from 'framer-motion';
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

export default function ServicesModal({ onClose }: { onClose: () => void }) {
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
          className="relative w-full max-w-5xl max-h-[90vh] overflow-auto rounded-2xl p-6 sm:p-8 md:p-10 bg-white/20 backdrop-blur-md shadow-lg"
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
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white/10 rounded-xl p-5 shadow-md text-center cursor-pointer hover:shadow-xl hover:scale-[1.05] transition-transform duration-300"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-white/90 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
