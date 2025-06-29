'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useEffect, type FC } from 'react';

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
    linkedin: 'https://linkedin.com/in/janedoe',
    twitter: 'https://twitter.com/janedoe',
  },
  {
    name: 'Andargachew',
    role: 'Lead Developer',
    image: '/Image/Andi.jpg',
    linkedin: 'https://linkedin.com/in/johnsmith',
  },
  {
    name: 'Aklog Tefera',
    role: 'UI/UX Designer',
    image: '/team/emily.jpg',
    twitter: 'https://twitter.com/emilydesigns',
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

const borderRadius = 8; // px for card border-radius
const strokeWidth = 2;
const halfStroke = strokeWidth / 2;
const strokeDasharray = 384;

const TeamModal: FC<TeamModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl p-6 sm:p-8 md:p-10 bg-white/20 backdrop-blur-md shadow-lg text-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            {/* Header */}
            <div className="flex justify-center items-center mb-8 relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">
                Meet Our Team
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-0 right-0 text-white hover:text-red-400 transition text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Team Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, idx) => (
                <motion.div
                  key={member.name}
                  className="relative bg-black/20 backdrop-blur-md"
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
                      <linearGradient id={`grad-team-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
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
                      stroke={`url(#grad-team-${idx})`}
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
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden relative ring-1 ring-white/50">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{member.role}</p>
                    <div className="flex justify-center gap-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <FaLinkedin className="text-white hover:text-blue-400" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                          <FaTwitter className="text-white hover:text-blue-300" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamModal;
