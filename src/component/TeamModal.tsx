'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { FC } from 'react';

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
    image: '/image/abela.jpg',
    linkedin: 'https://linkedin.com/in/janedoe',
    twitter: 'https://twitter.com/janedoe',
  },
  {
    name: 'Andargachew',
    role: 'Lead Developer',
    image: '/image/Andi.jpg',
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl p-5 sm:p-8 shadow-lg bg-transparent"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            {/* Centered title */}
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
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  className="text-center p-4 border border-white/30 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
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
