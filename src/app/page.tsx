'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { StaticImageData } from 'next/image';
import { PROJECTS } from './data/projects';
// Chat bubble with 3 dots inside
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMobileAlt,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHome, FaInfoCircle, FaBriefcase, FaUsers, FaQuestionCircle,FaHandshake 
 } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Sidebar from '@/component/sidebar';
import AboutModal from '@/component/AboutModal';
import FAQPage from '@/component/faqmodal';
import ServicesModal from '@/component/ServicesModal';
import TeamModal from '@/component/TeamModal';
import PartnerModal from '@/component/PartnerModal';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
// Very close match — message bubble + ellipsis
import { IoMdMenu } from 'react-icons/io';
import { logos } from './data/logo';
type Project = {
  id: number;
  title: string;
  client: string;
  contributors: string;
  summary: string;
  images: (string | StaticImageData)[];
  testimonials?: {
    quote: string;
    clientName: string;
    clientTitle: string;
    clientImage: string | StaticImageData;
  }[];
};

export default function Home() {
  const controls = useAnimation();
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
 const navItems = [
  { label: 'Home', icon: <FaHome size={18} /> },
  { label: 'About Us', icon: <FaInfoCircle size={18} /> },
  { label: 'Services', icon: <FaBriefcase size={18} /> },
  { label: 'Team', icon: <FaUsers size={18} /> },
  { label: 'Our client', icon: <FaHandshake size={18} /> },
  { label: 'FAQ', icon: <FaQuestionCircle size={18} /> },
];
const texts = [
  {
    text: 'THINK',
    bg: 'bg-gradient-to-r from-[#ee5225] to-[#ee5225]',
    textColor: 'text-white',
  },
  {
    text: 'CRAFT',
    bg: 'bg-gradient-to-r from-[#ee5225] to-[#ee5225]',
    textColor: 'text-white',
  },
  {
    text: '& IMPACT!',
    bg: 'bg-gradient-to-r from-[#191D49] to-[#191D49]',
    textColor: 'text-white',
  },
];
const socialLinks = [
  {
    icon: FaFacebook,
    href: 'https://web.facebook.com/profile.php?id=61573495564965',
    label: 'Facebook',
  },
  {
    icon: FaInstagram,
    href: 'https://www.instagram.com/adveracreatives/',
    label: 'Instagram',
  },
  {
    icon: FaTiktok,
    href: 'https://www.tiktok.com/@adveracreatives',
    label: 'TikTok',
  },
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/company/adveracreative',
    label: 'LinkedIn',
  },
];

//   const waveCount = 3;
// const waveDuration = 1.5;
// const delayBetweenWaves = 0.5;
useEffect(() => {
  // Only run this effect on mobile screens
  if (window.innerWidth > 768) return;
  // You can add mobile-specific logic here if needed
}, []);
const [currentFace, setCurrentFace] = useState(0);

  // Flip every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotation angles for each face (0deg, 120deg, 240deg) on X axis
  const rotateX = -currentFace * 120;
useEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }
}, [selectedProject]);

useEffect(() => {
  if (formStatus === 'success' || formStatus === 'error') {
    const timer = setTimeout(() => {
      setFormStatus('idle'); // reset to initial state
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }
}, [formStatus, setFormStatus]);

useEffect(() => {
  controls.start("visible");
}, [controls]);

const [showContact, setShowContact] = useState(false);
//  const handleReload = () => {
//     // Force full page reload (same as reload(true) in older browsers)
//     window.location.href = window.location.href;
//   };
useEffect(() => {
  if (showContact) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [showContact]);

const nextImage = () =>
  setCurrentImageIndex((prev) => (prev + 1) % (selectedProject?.images.length ?? 1));

const prevImage = () =>
  setCurrentImageIndex((prev) =>
    (prev - 1 + (selectedProject?.images.length ?? 1)) % (selectedProject?.images.length ?? 1)
  );

const handleNavigate = (section: string) => {
  const lower = section.toLowerCase();
  if (lower === 'team') setShowTeamModal(true);
  else if (lower === 'about us' ) setShowAboutModal(true);
  else if (lower === 'services') setShowServicesModal(true);
  else if (lower === 'faq') setShowFAQModal(true);
  else if (lower === 'our client') setShowPartnerModal(true);

  else {
    const targetId =
      section === 'Home' ? 'body' : section === 'Portfolio' ? 'projects' : lower.replace(/\s+/g, '-');
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
};
 const router = useRouter();
const [isOpen, setIsOpen] = useState(false);
// Simple implementation of CSS steps() easing for framer-motion
return (
    <div className="flex min-h-screen flex-col">
      {/* Responsive Menu Bar */}
<div className="menu-bar">
  {/* Logo with Reload on Click */}
 <div
      className="logo cursor-pointer select-none flex items-center"
      onClick={() => router.push('/')}
    >
      <Image
        src="/Image/advo.svg"
        alt="Advera Logo"
        width={100}
        height={30}
        className="h-10 w-auto"
        priority
      />
    </div>
      {/* Toggle Menu Button */}
  <div className="fixed top-4 right-6 z-50 md:hidden">
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="p-2 rounded-md bg-[#ee5225]/100 text-white focus:outline-none"
      aria-label="Toggle Menu"
    >
      <IoMdMenu size={24} />
    </button>
  </div>
  {/* Animated Mobile Nav */}
<ul className={`menu-bar nav-links ${isOpen ? 'open' : ''}`}>
  {navItems.map(({ label, icon }) => {
    const isCenteredIcon = label === 'Services' || label === 'About Us';
    const isOurClient = label === 'Our client';

    return (
      <li key={label}>
        <button
          onClick={() => {
            if (label === 'Home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              handleNavigate(label);
            }
            setIsOpen(false);
          }}
          className="w-full text-white transition-all font-medium flex flex-col items-center justify-center py-1"
        >
          {/* Icon */}
          <span
            className={`text-x1 ${
              isOurClient
                ? '-translate-x-1'
                : isCenteredIcon
                ? '-translate-x-1'
                : '-translate-x-1'
            }`}
          >
            {icon}
          </span>

          {/* Label */}
          <span
            className={`text-[0.7rem] whitespace-nowrap ${
              isOurClient
                ? '-translate-x-5'
                : isCenteredIcon
                ? '-translate-x-4'
                : '-translate-x-2'
            }`}
          >
            {label}
          </span>
        </button>
      </li>
    );
  })}
</ul>
</div>
    <div className="flex flex-grow ">
        <div className="fixed top-0 left-0 h-screen w-20 lg:w-64 z-40 pointer-events-auto">
          <Sidebar
            onSectionClick={handleNavigate}
            onFAQClick={() => setShowFAQModal(true)}
            onAboutClick={() => setShowAboutModal(true)}
          />
        </div>

<main className="ml-0 sm:ml-20 lg:ml-45 px-2 sm:px-8 py-10 w-full bg-white text-black text-[17px] sm:text-base">
<section id="projects" className="mb-20 relative">
  {/* Social Icons */}
  <div className="absolute top-2 right-2 z-10 flex gap-4 hidden md:flex">
      {socialLinks.map(({ icon: Icon, href, label }, i) => (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[#191D49] hover:text-[#ee5225] transition-colors"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>

  {/* Container for slogan + button + description with top padding */}
  <div className="pt-12 px-4 sm:px-0"> {/* Adjust pt-12 to increase/decrease space */}
    {/* Slogan on top-left with typing animation */}
 <div className="flex justify-start items-center min-h-[80px] perspective-1000 p-8 -mt-18 -ml-8 ">
      <motion.div
        className="relative w-50 h-18  cursor-pointer select-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg)`,
          transition: 'transform 1s ease-in-out',
        }}
        aria-label="Flipping text card"
      >
        {texts.map(({ text, bg, textColor }, i) => {
          // Each face is rotated by 0, 120, 240 degrees around X axis
          return (
            <motion.div
              key={i}
              className={`absolute w-50 h-18  flex justify-center rounded-full items-center ${bg}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateX(${i * 120}deg) translateZ(24px)`,
                // translateZ = half of height (approx)
              }}
            >
              <motion.h2
                className={`text-4xl font-bold tracking-tight ${textColor} select-none`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              >
                {text}
              </motion.h2>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
                          {/* Button + Description */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 mt-5">
<button
  onClick={() => {}}
  className="fit-text-mobile sm:w-auto w-auto text-left px-4 py-2 sm:px-5 sm:py-2 bg-[#ee5225] hover:bg-[#d9431d] text-sm sm:text-base text-white font-semibold rounded-full shadow-md transition-all duration-300 leading-none"
>
  Our Projects
</button>

  <p className="text-black font-semibold text-sm sm:text-base">
    Check out some of our featured work.
  </p>
</div>
  </div>
{/* Project Cards */}
<div className="px-4 sm:px-0">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
    {PROJECTS.map((project) => {
      const isActive = activeProjectId === project.id;

      return (
        <div
          key={project.id}
          id={`project-${project.id}`}
          className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${
            isActive ? 'scale-105' : 'hover:scale-105'
          }`}
          onTouchStart={() => {
            if (isMobile) {
              // First tap: just activate hover effect
              if (activeProjectId !== project.id) {
                setActiveProjectId(project.id);
              }
            }
          }}
          onClick={() => {
            if (isMobile) {
              // Second tap (if already active): open modal
              if (activeProjectId === project.id) {
                setSelectedProject(project);
              } else {
                // If not active yet, just activate (handled in onTouchStart)
                setActiveProjectId(project.id);
              }
            } else {
              // Desktop: click opens modal
              setSelectedProject(project);
              setActiveProjectId(project.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View project: ${project.title}`}
        >
          {/* Image */}
          <div className="relative w-full" style={{ height: '278px' }}>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              draggable={false}
            />
          </div>

          {/* Overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />

          {/* Text */}
          <div
            className={`absolute bottom-1 left-0 right-0 px-4 pb-3 z-20 text-white transition-opacity duration-500 ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          >
            <h3 className="text-lg font-semibold drop-shadow-sm">{project.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 drop-shadow-sm">
              {project.summary}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>
   {/* Floating Contact Button */}
<div className="fixed bottom-8 right-2 z-[70]">
  <div className="relative w-16 h-16">

    {/* Meteor Trail */}
    <motion.span
      className="absolute w-10 h-[2px] bg-[#ee5225] rounded-full opacity-40 blur-sm"
      initial={{ x: -40, y: -30, rotate: 45 }}
      animate={{ x: 80, y: 80 }}
      transition={{
        duration: 2.2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        delay: 1,
      }}
    />

    <motion.div
      whileHover={{ scale: 1.1, y: -6 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
      }}
      className="relative z-10"
    >
      <button
        onClick={() => setShowContact(true)}
        className={`group w-16 h-16 rounded-full shadow-2xl transition-all duration-300 
          flex items-center justify-center relative overflow-hidden
          ${isOpen ? 'bg-white text-[#ee5225]' : 'bg-[#ee5225] text-white'}
          hover:bg-[#fdfdfd] sm:hover:bg-[#d9431d]`}
        aria-label="Open Contact Form"
      >
        {/* Icon */}
        <HiOutlineChatBubbleLeftEllipsis
          size={28}
          className={`transition-transform duration-300 z-10 group-hover:scale-110 ${
            isOpen ? 'text-[#ee5225]' : 'text-white'
          }`}
        />

        {/* Optional Ping Indicator */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white opacity-60 animate-ping z-20" />

        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#ee522530] blur-2xl z-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </button>
    </motion.div>
  </div>
</div>
  {/* Logo Section */}
</section>

  {/* Footer: Only show when filter is 'All' */}

<footer className="w-full px-4 sm:px-0 mt-12 bg-transparent">      <hr className="border-t border-[#ee5225] opacity-50 my-8 w-full" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 w-full">
        {/* Logo */}
        <div className="flex flex-col items-start justify-start text-base text-left">
          <Image
            src="/Image/advera2.svg"
            alt="Advera Logo"
            width={120}
            height={40}
            className="h-12 w-auto mb-6"
            priority
          />
        </div>

        {/* Contact, Location, Socials */}
        <div className="md:col-span-3 w-full flex justify-end">
          <div className="flex flex-col md:flex-row gap-x-18 w-full md:w-auto">
            {/* Contact Us */}
            <div className="flex flex-col items-start justify-start text-base">
              <h4 className="text-[#ee5225] font-semibold mb-4 text-start">Contact Us</h4>
              <div className="flex items-center gap-4 mb-2">
                <p className="text-[#191D49] text-sm flex items-center gap-2">
                  <FaMobileAlt className="text-[#ee5225]" size={11} />
                  +251941922516
                </p>
                <p className="text-[#191D49] text-sm flex items-center gap-2">
                  <FaPhoneAlt className="text-[#ee5225]" size={11} />
                  +251941922516
                </p>
              </div>
              <p className="text-[#191D49] text-sm flex items-center gap-2">
                <FaEnvelope className="text-[#ee5225]" size={11} />
                adveracommunication@gmail.com
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-start justify-start text-base">
              <h4 className="text-[#ee5225] font-semibold mb-4 text-start">Location</h4>
              <p className="text-[#191D49] flex items-start gap-2 text-sm text-left">
                <FaMapMarkerAlt className="text-[#ee5225] mt-1" />
                <span className="leading-relaxed">
                  Lagare, ORDA Building 1st Floor
                  <br />
                  Addis Ababa, Ethiopia
                </span>
              </p>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-start justify-start text-base text-left">
              <h4 className="text-[#ee5225] font-semibold mb-4 text-start">Follow Us</h4>
              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href="https://web.facebook.com/profile.php?id=61573495564965"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191D49] hover:text-[#ee5225] transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/adveracreatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191D49] hover:text-[#ee5225] transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@adveracreatives"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191D49] hover:text-[#ee5225] transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/adveracreative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191D49] hover:text-[#ee5225] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 opacity-30 my-8 w-full" />
      <div className="text-center text-sm text-gray-500 w-full">
        &copy; {new Date().getFullYear()} Advera Communication. All rights reserved.
      </div>
    </footer>
  
</main>
      </div>

      {/* Modal Preview */}
{selectedProject && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="bg-white w-screen h-screen overflow-y-auto shadow-lg relative rounded-none"
      onClick={e => e.stopPropagation()}
    >
      {/* Hero Image Section */}
      <div className="relative w-full h-48 md:h-[70vh] bg-black overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white text-3xl z-50 hover:text-[#ee5225] rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setSelectedProject(null)}
          aria-label="Close Project Modal"
        >
          &times;
        </button>

        {/* Prev Button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl z-40 bg-white/30 hover:bg-white/50 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
          onClick={prevImage}
          aria-label="Previous Image"
        >
          <HiChevronLeft />
        </button>

        {/* Hero Image */}
        <Image
          src={selectedProject.images?.[currentImageIndex]}
          alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Next Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl z-40 bg-white/30 hover:bg-white/50 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
          onClick={nextImage}
          aria-label="Next Image"
        >
          <HiChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center space-x-2 z-40">
          {selectedProject.images?.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 md:px-8 py-10 text-[#58595b]">
        {/* Left Column */}
        <div className="pl-4 md:pl-8">
          <h1 className="text-2xl md:text-3xl text-black font-bold mb-4">{selectedProject.title}</h1>

          <div className="mb-3">
            <h3 className="font-bold text-lg">Client</h3>
            <p className="text-sm">{selectedProject.client}</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-lg">Contributors</h3>
            <p className="text-sm">{selectedProject.contributors}</p>
          </div>

          <div className="mt-20">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-6 py-2 
                bg-[#ee5225] text-white 
                md:bg-[#f1f2f2] md:text-black 
                hover:text-white font-semibold 
                rounded-full transition 
                md:hover:bg-[#ee5225]
                active:bg-[#d9431d] active:scale-95"
            >
              Back to Projects
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="pl-4 md:pl-8">
          <h3 className="font-bold text-lg mb-2">Project Summary</h3>
          <p className="whitespace-pre-line mb-6 text-sm md:text-base">{selectedProject.summary}</p>

          {(selectedProject.testimonials?.length ?? 0) > 0 && (
            <div className="pb-10">
              <h4 className="text-xl font-semibold text-[#191D49] mb-6">Client Testimonials</h4>
              <div className="grid grid-cols-1 gap-6">
                {selectedProject.testimonials?.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-[#f1f2f2] rounded-xl border border-orange-100 p-5 shadow-md"
                  >
                    <p className="text-sm text-gray-700 italic mb-4">“{testimonial.quote}”</p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.clientImage}
                        alt={testimonial.clientName}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-orange-300 shadow"
                      />
                      <div>
                        <p className="text-base font-semibold text-gray-800">{testimonial.clientName}</p>
                        <p className="text-sm text-gray-500">{testimonial.clientTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
{/* Contact Form Modal */}
 {showContact && (
         <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowContact(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div
            className="bg-white/20 backdrop-blur-md p-6 sm:p-10 w-full max-w-[95%] sm:max-w-xl md:max-w-2xl rounded-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ WebkitOverflowScrolling: 'touch' }} // smooth iOS scrolling
          >
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-white hover:text-[#ee5225] text-2xl sm:text-3xl font-bold"
              aria-label="Close Contact Form"
              style={{ touchAction: 'manipulation' }}
            >
              &times;
            </button>

            <h3
              id="contact-modal-title"
              className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center"
            >
              Get in Touch
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (!contactForm.name || !contactForm.email || !contactForm.message) {
                  setFormStatus('error');
                  return;
                }

                setFormStatus('sending');
                try {
                  const res = await fetch('https://formspree.io/f/mwpbrjoz', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify(contactForm),
                  });

                  const data = await res.json();
                  if (data.ok) {
                    setFormStatus('success');
                    setContactForm({ name: '', email: '', message: '' });
                  } else {
                    setFormStatus('error');
                  }
                } catch (err) {
                  console.error(err);
                  setFormStatus('error');
                }
              }}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
                className="w-full border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
                autoComplete="organization"
                inputMode="text"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                className="w-full border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
                autoComplete="email"
                inputMode="email"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                className="w-full border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md resize-none h-28 sm:h-32 text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
                rows={5}
              />

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="bg-[#ee5225] text-white py-3 rounded-md hover:bg-[#d9431d] transition font-semibold text-base sm:text-lg disabled:opacity-50"
                style={{ touchAction: 'manipulation' }}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-3 rounded-xl bg-green-600/20 text-green-600 px-6 py-3 font-semibold shadow-lg text-center select-none"
                    role="alert"
                  >
                    <svg
                      className="w-6 h-6 stroke-green-600"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent successfully!
                  </motion.p>
                )}

                {formStatus === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-3 rounded-xl bg-red-600/20 text-red-600 px-6 py-3 font-semibold shadow-lg text-center select-none"
                    role="alert"
                  >
                    <svg
                      className="w-6 h-6 stroke-red-600"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    Something went wrong. Please check your inputs and try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      )}

      {/* Other Modals */}
      {showTeamModal && <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />}
      {showAboutModal && <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />}
      {showServicesModal && <ServicesModal onClose={() => setShowServicesModal(false)} />}
      {showFAQModal && <FAQPage isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />}
       {showPartnerModal && (
  <PartnerModal
    allLogos={logos}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}
    onClose={() => setShowPartnerModal(false)}
  />
)}

    </div>
  );
}