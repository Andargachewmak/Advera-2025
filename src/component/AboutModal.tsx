'use client';

import { Maven_Pro } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const mavenPro = Maven_Pro({
  subsets: ['latin'],
  weight: '400', // Regular
});

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#1a1a1a]/92 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative rounded-3xl bg-black/38 opacity-89 backdrop-blur-1xl text-white overflow-auto"
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
              onClick={onClose}
              className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
              aria-label="Close About Modal"
            >
              ×
            </button>

            {/* Content */}
            <div className="space-y-12 text-center mt-8 ml-3">
              <div className="mb-29">
                <h1 className="text-[42px] sm:text-4xl font-extrabold mb-6 tracking-tight">
                  About Us
                </h1>
                <p className={`${mavenPro.className} text-white text-[15px] leading-[18px] max-w-3xl tracking-tighter mx-auto`}>
                  We are the dynamic hub for marketing, communication, and brands. Committed to achieving your goals,
                  we provide creative and impactful marketing and communication plans that resonate with your target
                  market and elevate your business.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {[
                  {
                    title: (
                      <>
                        The Spark to <br />
                        Ignite Your Ideas
                      </>
                    ),
                    text:
                      'Ever had a brilliant idea you can’t quite express? At Advera, we transform your vision into reality—often before you can finish the thought.',
                  },
                  {
                    title: (
                      <>
                        Teamwork Makes <br />
                        the Dream Work
                      </>
                    ),
                    text:
                      'At Advera, collaboration drives every project. Our team ensures every detail is crafted thoughtfully because, as the saying goes, the sum is greater than the parts.',
                  },
                  {
                    title: (
                      <>
                        Precision or <br /> Passion?
                      </>
                    ),
                    text:
                      'We’re never satisfied with “good enough.” Every idea and word is crafted with care to reflect your vision perfectly. We ensure your brand is polished and ready to captivate.',
                  },
                ].map(({ title, text }, idx) => {
                  const isPrecisionCard = idx === 2;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col justify-between bg-[#4d4d4d]/35  rounded-2xl p-6 duration-300 w-[251px] h-[251px]"
                    >
                      <div className="flex flex-col h-full justify-center items-center text-left">
                        {/* Title */}
                        <h2
                          className={`text-[21px] font-bold text-left text-white leading-[23px] tracking-tighter ${
                            isPrecisionCard ? 'ml-[-85px]' : '-ml-10'
                          }`}
                        >
                          {title}
                        </h2>

                        {/* Description */}
                        <p className={`${mavenPro.className} text-white text-[15px] leading-[18px] mt-[24px] tracking-tighter`}>
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
