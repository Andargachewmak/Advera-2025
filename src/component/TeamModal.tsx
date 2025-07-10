'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useEffect, useState, useRef, type FC } from 'react';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
};

type TeamModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const team: TeamMember[] = [
  {
    name: 'Abel Tefera',
    role: 'CEO & Founder',
    image: '/Image/abela.jpg',
  },
  {
    name: 'KETEMA KEBEDE',
    role: 'Senior Strategic Advisor',
    image: '/Image/emily.jpg',
  },
  {
    name: 'Aklog Tefera',
    role: 'UI/UX Designer',
    image: '/team/emily.jpg',
  },
  {
    name: 'REKIK MESFIN',
    role: 'Marketing, Content Creator',
    image: '/team/emily.jpg',
  },
  {
    name: 'Andargachew',
    role: 'Lead Developer',
    image: '/Image/Andi.jpg',
  },
  {
    name: 'MUFERIHA ',
    role: 'Copywriter',
    image: '/team/emily.jpg',
  },
];

const TeamModal: FC<TeamModalProps> = ({ isOpen, onClose }) => {
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(team.length / itemsPerSlide);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setDirection(1);
        setActiveIndex((prev) => Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide));
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, totalSlides, onClose, isMobile]);

  useEffect(() => {
    if (!isOpen || isMobile) return;
    const onWheel = (e: WheelEvent) => {
      if (wheelTimeoutRef.current) return;
      const delta = e.deltaX || (e.shiftKey ? e.deltaY : 0);
      if (delta === 0) return;
      e.preventDefault();

      if (delta > 0) {
        setDirection(1);
        setActiveIndex((prev) => Math.min(prev + itemsPerSlide, (totalSlides - 1) * itemsPerSlide));
      } else {
        setDirection(-1);
        setActiveIndex((prev) => Math.max(prev - itemsPerSlide, 0));
      }

      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 400);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [isOpen, totalSlides, isMobile]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#1a1a1a]/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          onClick={onClose}
        >
          <motion.div
            className="relative rounded-3xl bg-black/38 backdrop-blur-1xl text-white flex flex-col overflow-y-auto"
            style={{ width: '974.4px', height: '611.1px', padding: '42.78px 58.46px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            onClick={(e) => e.stopPropagation()}
            layout
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-white hover:text-red-400 text-2xl font-bold"
              aria-label="Close Team Modal"
            >
              ×
            </button>

            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-[42px] sm:text-4xl font-bold mb-3">Our Team</h2>
              <p className="text-white text-[15px] leading-[18px] max-w-3xl tracking-tighter mx-auto">
                A dynamic team of strategists, designers, and developers committed to transforming bold ideas into powerful digital solutions. With a blend of creativity, technology, and strategy, we craft meaningful experiences that drive results and leave a lasting impact.
              </p>
            </div>

            {/* Team Grid */}
            {isMobile ? (
              <div className="grid grid-cols-1 gap-6 justify-items-center pb-6">
                {team.map((member) => (
                  <div
                    key={member.name}
                    className="bg-[#4d4d4d]/35 rounded-2xl p-6 text-center w-[251px] h-[251px] flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full overflow-hidden relative ring-1 ring-white/50">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-[18px] font-bold">{member.name}</h3>
                    <p className="text-[14px] text-white/90 mb-2">{member.role}</p>
                    <div className="flex justify-center gap-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <FaLinkedin className="text-white hover:text-blue-400 transition" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                          <FaTwitter className="text-white hover:text-blue-300 transition" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center pb-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                    exit={{ x: direction > 0 ? -300 : 300, opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {team
                      .slice(activeIndex, activeIndex + itemsPerSlide)
                      .map((member) => (
                        <div
                          key={member.name}
                          className="bg-[#4d4d4d]/35 rounded-2xl p-6 text-center w-[251px] h-[251px] flex flex-col items-center justify-center"
                        >
                          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full overflow-hidden relative ring-1 ring-white/50">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-[18px] font-bold">{member.name}</h3>
                          <p className="text-[14px] text-white/90 mb-2">{member.role}</p>
                          <div className="flex justify-center gap-4">
                            {member.linkedin && (
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="text-white hover:text-blue-400 transition" />
                              </a>
                            )}
                            {member.twitter && (
                              <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter className="text-white hover:text-blue-300 transition" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Dot Navigation */}
            {!isMobile && (
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamModal;
