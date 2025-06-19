'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUsers,
  FaPhoneAlt,
  FaQuestionCircle,
} from 'react-icons/fa';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const navbar = [
  { name: 'Home', key: 'home', href: '/', icon: <FaHome size={18} /> },
  { name: 'About Us', key: 'about', href: '#about-us', icon: <FaInfoCircle size={18} /> },
  { name: 'Services', key: 'services', href: '#services', icon: <FaBriefcase size={18} /> },
  { name: 'Team', key: 'team', href: '#team', icon: <FaUsers size={18} /> },
  { name: 'FAQ', key: 'faq', href: '#faq', icon: <FaQuestionCircle size={18} /> },
];

type SidebarProps = {
  onSectionClick: (key: string) => void;
  onFAQClick: () => void;
};

export default function Sidebar({ onSectionClick, onFAQClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fixed background color (no scroll effect)
  const baseBg = 'bg-[#ee5225]';

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-[#ee5225]/100 text-white focus:outline-none"
          aria-label="Open Menu"
        >
          <IoMdMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-54 ${baseBg} transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 relative shadow-xl font-monasans`}
      >
        {/* Animated Background Pattern with Reduced Opacity */}
        <motion.div
          className="absolute inset-0 bg-repeat-y bg-center bg-[length:100%_auto] pointer-events-none opacity-38"
          style={{ backgroundImage: 'url(/Image/pptr.svg)' }}
          animate={{ backgroundPositionY: ['0%', '100%'] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <aside className="relative min-h-screen flex flex-col justify-between px-4 py-6 md:py-10 overflow-y-auto pt-[env(safe-area-inset-top)]">
          {/* Close button (mobile only) */}
          <div className="md:hidden flex justify-end mb-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 focus:outline-none"
              aria-label="Close Menu"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Logo + Nav */}
          <div>
            <div className="mb-10 flex items-center justify-start px-4">
              <img
                src="/Image/adve.svg"
                alt="Advera Logo"
                className="h-10 w-auto"
              />
            </div>

            <nav>
              <ul className="space-y-4 relative z-10">
                {navbar.map(({ name, key, href, icon }) => {
                  const sharedClass =
                    'inline-flex items-center px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer select-none text-white hover:bg-orange-400 hover:text-white';

                  if (name === 'FAQ') {
                    return (
                      <li key={key}>
                        <button
                          onClick={() => {
                            onFAQClick();
                            setIsOpen(false);
                          }}
                          className={`${sharedClass} focus:outline-none`}
                          aria-label="Open FAQ"
                        >
                          <span>{icon}</span>
                          <span className="ml-3 font-medium text-sm tracking-wide">{name}</span>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={key}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          onSectionClick(key);
                          setIsOpen(false);
                        }}
                        className={sharedClass}
                      >
                        <span>{icon}</span>
                        <span className="ml-3 font-medium text-sm tracking-wide">{name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom CTA */}
          <div className="px-2 mt-2 md:mt-6 mb-6 relative z-10">
                  <a href="tel:0966557743" onClick={() => setIsOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 border border-[#191D49] text-white hover:bg-[#191D49] hover:text-white active:scale-95 transition-all duration-300 font-semibold rounded-xl px-3 py-2 shadow-md hover:shadow-[#191D49]/30 bg-[#191D49] focus:outline-none text-sm">
                      <FaPhoneAlt className="text-sm" />
                      <span>Call Us</span>
                    </button>
        </a>
          </div>
        </aside>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
