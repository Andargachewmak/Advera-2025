'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import type { FC } from 'react'

type TeamMember = {
  name: string
  role: string
  image: string
  linkedin?: string
  twitter?: string
}

type TeamModalProps = {
  isOpen: boolean
  onClose: () => void
}

const team: TeamMember[] = [
  {
    name: 'Abel Tefera ',
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
]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    y: -60,
    x: 60,
    originX: 1,
    originY: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 18,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    x: 20,
    transition: {
      duration: 0.25,
      ease: 'easeInOut' as const,
    },
  },
}

const TeamModal: FC<TeamModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="transform-gpu origin-top-right max-w-5xl w-full rounded-2xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh] bg-transparent"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-300 hover:text-red-500 transition"
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">Meet Our Team</h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: 'tween', ease: 'easeOut', duration: 0.5 },
                    },
                  }}
                  className="text-center p-4 border rounded-xl shadow-lg transition-shadow bg-white/20 backdrop-blur-md hover:shadow-2xl hover:bg-white/30"
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TeamModal
