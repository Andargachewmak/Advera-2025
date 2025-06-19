'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaPaintBrush, FaPenNib } from 'react-icons/fa'

const services = [
   {
    title: 'Graphics Design',
    icon: <FaPenNib size={32} className="text-green-400" />,
    description:
      'Creative and professional graphics that visually communicate your brand identity.',
  },
   {
    title: 'UI/UX Design',
    icon: <FaPaintBrush size={32} className="text-pink-400" />,
    description:
      'Our designs are user-centered and visually stunning across all platforms.',
  },
  {
    title: 'Web Development',
    icon: <FaCode size={32} className="text-blue-400" />,
    description:
      'We build fast, responsive, and scalable web applications tailored to your needs.',
  },
 
 
]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, ease: "easeOut" as const, duration: 0.5 },
  },
}

export default function ServicesModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative w-full max-w-4xl rounded-2xl p-6 sm:p-8 md:p-10 bg-transparent overflow-auto max-h-[90vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-2xl font-bold transition"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
            Our Services
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-lg text-center hover:bg-white/30 hover:shadow-2xl transition"
                variants={cardVariants}
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-gray-200 mt-2">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
