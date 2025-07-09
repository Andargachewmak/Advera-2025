'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: 'What services do you offer?',
    answer: 'We offer web design, development, UI/UX, branding, and digital marketing solutions tailored to your business needs.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary, but most small to medium projects take 2-6 weeks from start to launch.',
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes, we offer post-launch support and maintenance to ensure your product runs smoothly.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer: 'Absolutely. We can analyze your current site and offer a full redesign to improve performance and aesthetics.',
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

type FAQModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-[#1a1a1a]/92 backdrop-blur-sm flex items-center justify-center p-4"
          
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-6xl overflow-auto rounded-2xl px-6 py-10 sm:px-10 bg-black/38   text-white"
                        style={{ width: '974.4px', height: '611.1px', padding: '42.78px 58.46px' }}

            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            {/* Close Button */}
            <button
              aria-label="Close FAQ"
              onClick={onClose}
              className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Header */}
            <div className="text-center mt-8 mb-10">
              <h1 className="text-[32px] sm:text-4xl font-bold text-white mb-3">FAQ</h1>
              <p className="text-white text-[15px] leading-[18px] max-w-3xl tracking-tighter mx-auto">
                Find answers to the most common questions about our services, process, and support. If you can’t find what you’re looking for, feel free to reach out directly.
              </p>
            </div>
            {/* FAQ List */}
            <section className="space-y-5 ">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  layout
                  className="bg-[#4d4d4d]/35  rounded-xl p-5  transition-shadow duration-300  "
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-[21px] sm:text-lg font-bold text-white ">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-white/70" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3 text-white/90 text-[15px] leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
