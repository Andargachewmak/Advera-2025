'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-auto rounded-2xl p-5 sm:p-8 bg-white/20 backdrop-blur-md shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            {/* Header */}
            <header className="flex justify-between items-start sm:items-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl font-bold text-white">
                Frequently Asked Questions
              </h1>
              <button
                aria-label="Close FAQ"
                onClick={onClose}
                className="text-white hover:text-red-400 transition text-2xl font-bold ml-4 sm:ml-0"
              >
                &times;
              </button>
            </header>

            {/* FAQ Items */}
            <section className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  layout
                  className="border border-white/40 rounded-xl p-4 bg-white/10 shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span className="text-base sm:text-lg font-medium text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} className="text-white/70" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3 text-white/90 text-sm"
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