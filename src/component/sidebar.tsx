'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUsers,
  FaPhoneAlt,
  FaQuestionCircle,FaHandshake,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const navbar = [
  { name: 'Home', key: 'home', href: '/', icon: <FaHome size={18} /> },
  { name: 'About Us', key: 'about', href: '#about-us', icon: <FaInfoCircle size={18} /> },
  { name: 'Services', key: 'services', href: '#services', icon: <FaBriefcase size={18} /> },
  { name: 'Team', key: 'team', href: '#team', icon: <FaUsers size={18} /> },
  { name: 'Client', key: 'our client', href: '#our client', icon: <FaHandshake size={18} /> },
  { name: 'FAQ', key: 'faq', href: '#faq', icon: <FaQuestionCircle size={18} /> }

];

export type SidebarProps = {
  onSectionClick: (key: string) => void;
  onFAQClick: () => void;
  onAboutClick: () => void;
};

export default function Sidebar({ onSectionClick, onFAQClick, onAboutClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const baseBg = 'bg-[#ee5225]';

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-43 ${baseBg} transition-all  duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 relative shadow-xl font-monasans`}
      >
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
              <Image
                src="/Image/adve.svg"
                alt="Advera Logo"
                width={100}
                height={40}
                className="h-10 w-auto cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  window.location.reload();
                }}
              />
            </div>

            <nav>
              <ul className="space-y-4 relative z-10">
                {navbar
                  .filter((item) => typeof item.href === 'string' && item.href)
                  .map(({ name, key, href, icon }) => {
                    const sharedClass =
                      'inline-flex items-center px-4 py-3 rounded-full transition-all duration-200 cursor-pointer select-none text-white hover:bg-[#d73d27]/30 hover:text-white';

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
                            <span className="ml-3.5 font-medium text-sm tracking-wide">{name}</span>
                          </button>
                        </li>
                      );
                    }

                    if (name === 'About Us') {
                      return (
                        <li key={key}>
                          <button
                            onClick={() => {
                              onAboutClick();
                              setIsOpen(false);
                            }}
                            className={`${sharedClass} focus:outline-none`}
                            aria-label="Open About Us"
                          >
                            <span>{icon}</span>
                            <span className="ml-3 font-medium text-sm tracking-wide">{name}</span>
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={key}>
                        <Link
                          href={href as string}
                          onClick={(e) => {
                            e.preventDefault();
                            if (key === 'home') {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else if (key) {
                              onSectionClick(key);
                            }
                            setIsOpen(false);
                          }}
                          className={sharedClass}
                        >
                          <span>{icon}</span>
                          <span className="ml-3 font-medium text-sm tracking-wide">{name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>

          {/* Bottom CTA */}
          <div className="px-2 mt-2 md:mt-6 mb-6 relative z-10">
            <Link href="tel:+251941922516" passHref>
              <button
                className="inline-flex items-center justify-center gap-2 text-[#191D49] hover:bg-[#191D49] hover:text-white active:scale-95 transition-all duration-300 font-semibold rounded-full px-3 py-2 shadow-md hover:shadow-[#191D49]/30 bg-white focus:outline-none text-sm"
                onClick={() => setIsOpen(false)}
              >
                <FaPhoneAlt className="text-sm" />
                <span>Call Us</span>
              </button>
            </Link>
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
