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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl p-6 sm:p-11 md:p-12 bg-white/20 backdrop-blur-md shadow-xl text-white"
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
              aria-label="Close Team Modal"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">
              Meet Our Team
            </h2>

            {/* Team Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  className="bg-black/20 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-center"
                >
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
                  <p className="text-xs text-white/90 mb-2">{member.role}</p>
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
