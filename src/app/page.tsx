'use client';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { PROJECTS } from './data/projects';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMobileAlt,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  
} from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FiMessageCircle} from 'react-icons/fi';
import Sidebar from '@/component/sidebar';
import AboutModal from '@/component/AboutModal';
import FAQPage from '@/component/faqmodal';
import ServicesModal from '@/component/ServicesModal';
import TeamModal from '@/component/TeamModal';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
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

const categories = ['Graphics (Logo, Poster)', 'Web development', 'UI/UX Design'];
const filterButtons = ['All', ...categories];

export default function Home() {
  const [filter, setFilter] = useState<string>('All');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  // Predefined logos for the marquee                                   
  const logos = [
    { src: '/Image/logo1.svg', alt: 'Navan', width: 200, height: 50 },
    { src: '/Image/logo2.svg', alt: 'Contentful', width: 200, height: 50 },
    { src: '/Image/logo3.svg', alt: 'Unilever', width: 200, height: 50 },
    { src: '/Image/logo4.svg', alt: 'Stack Overflow', width: 200, height: 50 },
    { src: '/Image/logo5.svg', alt: 'Riot Games', width: 200, height: 50 },
    { src: '/Image/logo6.svg', alt: 'Nike', width: 200, height: 50 },
  ];

  // State for active logo popup
  const [activeLogo, setActiveLogo] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
    description?: string;
  } | null>(null);

  // Load saved filter from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFilter = localStorage.getItem('selectedFilter');
      if (storedFilter && filterButtons.includes(storedFilter)) {
        setFilter(storedFilter);
      }
    }
  }, []);

  // Lock body scroll when modal open
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
  const handleFilterChange = (category: string) => {
    setFilter(category);
    setSelectedProject(null); // close modal if open
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFilter', category);
    }
  };

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(
      (project) => project.category.toLowerCase() === filter.toLowerCase()
    );
  }, [filter]);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % (selectedProject?.images.length ?? 1));

  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      (prev - 1 + (selectedProject?.images.length ?? 1)) % (selectedProject?.images.length ?? 1)
    );

  const handleNavigate = (section: string) => {
    const lower = section.toLowerCase();
    if (lower === 'team') setShowTeamModal(true);
    else if (lower === 'about us' || lower === 'about') setShowAboutModal(true);
    else if (lower === 'services') setShowServicesModal(true);
    else if (lower === 'faq') setShowFAQModal(true);
    else {
      const targetId =
        section === 'Home' ? 'body' : section === 'Portfolio' ? 'projects' : lower.replace(/\s+/g, '-');
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [showContact, setShowContact] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Responsive Menu Bar */}
<div className="menu-bar">
  <div className="logo">
    <Image
      src="/Image/advera2.svg"
      alt="Advera Logo"
      width={100}
      height={30}
      className="h-10 w-auto"
    />
  </div>

  {/* Hamburger icon with animation */}
  <div
    className="hamburger text-[#ee5225] transition-transform duration-300 hover:rotate-90"
    onClick={() => {
      document.querySelector('.nav-links')?.classList.toggle('open');
    }}
  >
    ☰
  </div>

  {/* Animated mobile nav */}
  <ul className="nav-links">
    {['Home', 'About Us', 'Services', 'Team', 'FAQ'].map((section, ) => (
      <li key={section}>
        <button
          onClick={() => {
            handleNavigate(section);
            document.querySelector('.nav-links')?.classList.remove('open');
          }}
          className="w-full text-white hover:text-orange-300 transition-all font-medium text-left"
        >
          <span
            className={`inline-block w-full pl-6 ${
              section === 'About Us' || section === 'Services' ? 'pl-8' : 'pl-6'
            }`}
          >
            {section}
          </span>
        </button>
      </li>
    ))}
  </ul>
</div>

      <div className="flex flex-grow ">
        <div className="fixed top-0 left-0 h-screen w-20 lg:w-64 z-40 pointer-events-auto">
          <Sidebar onSectionClick={handleNavigate} onFAQClick={() => setShowFAQModal(true)} />
        </div>

<main className="ml-0 sm:ml-20 lg:ml-45 p-8 w-full bg-white text-black">
  <section id="projects" className="mb-20">
    <h1 className="text-4xl font-extrabold text-[#ee5225] ">Projects</h1>
    <p className="text-gray-600 mt-2">Check out some of our featured work.</p>

<div className="flex flex-wrap items-center justify-between gap-6 mt-4 relative z-[40]">
  {/* Filter Buttons */}
  <div className="flex gap-5 flex-wrap">
    {filterButtons.map((btnCategory) => (
      <button
        key={btnCategory}
        onClick={() => handleFilterChange(btnCategory)}
        className={`px-5 py-2 rounded-full font-medium transition transform duration-200 ${
          filter === btnCategory
            ? 'bg-[#ee5225] text-white'
            : 'bg-[#f1f2f2] text-black hover:bg-orange-100'
        } active:scale-95`}
      >
        {btnCategory}
      </button>
    ))}
  </div>

  {/* Slogan on the right */}
  <div className="relative flex flex-col items-center justify-center text-center">
      {/* Animated Text Container */}
      <motion.div
        className="text-2xl sm:text-2xl font-bold whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [1, 0], // Alternates between fully visible and invisible
        }}
        transition={{
          duration: 1, // Duration of one blink cycle
          repeat: Infinity, // Repeats indefinitely
          repeatType: 'reverse', // Smoothly reverses the animation
          ease: 'easeInOut', // Smooth easing for transitions
        }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee5225] to-[#ee5225]">THINK,</span>
        <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ee5225] to-[#ee5225]">CRAFT,</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#191D49] to-[#25296d]">& IMPACT.</span>
      </motion.div>

      {/* Underline Animation */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-[#ee5225] to-[#f97316] mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{
          width: ['0rem', '6rem'], // Alternates between shrinking and growing
        }}
        transition={{
          duration: 1, // Synchronized with the text blinking
          repeat: Infinity, // Repeats indefinitely
          repeatType: 'reverse', // Smoothly reverses the animation
          ease: 'easeInOut', // Smooth easing for transitions
        }}
      />
    </div>
    </div>
<div className="absolute top-4 right-8 z-50 flex gap-4 hidden md:flex">
  {[FaFacebook, FaInstagram, FaTiktok, FaLinkedin].map((Icon, i) => {
    const ariaLabels = ['Facebook', 'Instagram', 'Tiktok', 'LinkedIn'];
    return (
      <a
        key={i}
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabels[i]}
      >
        <Icon className="text-[#191D49] hover:text-orange-500 transition" size={20} />
      </a>
    );
  })}
</div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-8">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          onClick={() => {
            setSelectedProject(project);
            setCurrentImageIndex(0);
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedProject(project);
              setCurrentImageIndex(0);
            }
          }}
          className="relative group cursor-pointer overflow-hidden shadow-lg transition-transform rounded-2xl duration-300 hover:scale-[1.03] focus:scale-[1.03] active:scale-[1.03] hover:shadow-2xl focus:shadow-2xl active:shadow-2xl outline-none"
        >
          <div className="relative w-full h-52">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
              draggable={false}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none z-10" />

          <div className="absolute bottom-1 left-0 right-0 px-4 pb-3 z-20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 ease-in-out text-white">
            <h3 className="text-lg font-semibold drop-shadow-sm">{project.title}</h3>
            <p className="text-sm text-white/90 line-clamp-2 drop-shadow-sm">
              {project.summary}
            </p>
          </div>
        </div>
      ))}
    </div>
{/* Floating Message Button */}
<div className="fixed-contact-button fixed bottom-6 right-6 z-[70] animate-pulse">
  <button
    onClick={() => setShowContact(true)}
    className="group bg-[#ee5225] hover:bg-[#d9431d] text-white p-4 rounded-full shadow-xl transition-all duration-300 relative overflow-hidden"
    aria-label="Open Contact Form"
  >
    <FiMessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
  </button>
</div>
    {/* Logo Slider */}
<div className="relative z-10 w-full round-full pt-8 pb-4 mb-12 mt-20 bg-gray-100">
  {/* Static Logos Grid */}
  <div className="flex flex-wrap justify-center gap-30">
    {logos.slice(0, 6).map((logo, idx) => (
      <div
        key={`${logo.alt}-${idx}`}
        className="flex-shrink-0 flex items-center transition-transform duration-300 hover:scale-110 cursor-pointer relative"
        onClick={() => setActiveLogo(logo)}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          draggable={false}
          className="h-[80px] sm:h-[60px] w-auto object-contain grayscale hover:grayscale-0"
        />
      </div>
    ))}
  </div>

  {/* Popup Modal */}
  {activeLogo && (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={() => setActiveLogo(null)}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setActiveLogo(null)}
        >
          &times;
        </button>
        <Image
          src={activeLogo.src}
          alt={activeLogo.alt}
          width={activeLogo.width}
          height={activeLogo.height}
          className="h-40 w-auto mx-auto object-contain mb-4"
        />
        <h3 className="text-xl font-bold">{activeLogo.alt}</h3>
        <p className="text-gray-600">{activeLogo.description || 'No description available.'}</p>
      </div>
    </div>
  )}
</div>
      </section>

  {/* Footer: Only show when filter is 'All' */}
  {filter === 'All' && (
    <footer className="w-full mt-12 bg-transparent">
      <hr className="border-t border-[#ee5225] opacity-50 my-8 w-full" />

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
  )}
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
      onClick={(e) => e.stopPropagation()}
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
          src={selectedProject.images[currentImageIndex]}
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
          {selectedProject.images.map((_, index) => (
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
        <div className="pl-4 md:pl-8">
          <h1 className="text-2xl md:text-3xl text-black font-bold mb-4">{selectedProject.title}</h1>

          <div className="mb-3">
            <h3 className="font-bold text-lg">Client</h3>
            <p className="text-sm">{selectedProject.client}</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-lg">Category</h3>
            <p className="text-sm">{selectedProject.category}</p>
          </div>

          <div className="mb-3">
            <h3 className="font-bold text-lg">Contributors</h3>
            <p className="text-sm">{selectedProject.contributors}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-6 py-2 bg-[#f1f2f2] text-black hover:text-white font-semibold rounded-full hover:bg-[#ee5225] transition"
            >
              Back to Projects
            </button>
          </div>
        </div>

        <div>
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
    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm"
    onClick={() => setShowContact(false)}
  >
    <div
      className="bg-white/20 backdrop-blur-md p-10 w-full max-w-4xl rounded-2xl shadow-xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowContact(false)}
        className="absolute top-4 right-4 text-white hover:text-[#ee5225] text-3xl font-bold"
        aria-label="Close Contact Form"
      >
        &times;
      </button>
      <h3 className="text-3xl font-bold mb-6 text-white text-center">Get in Touch</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          // Basic validation (optional, can extend)
          if (!contactForm.name || !contactForm.email || !contactForm.message) {
            setFormStatus('error');
            return;
          }

          setFormStatus('sending');
          try {
            const res = await fetch('https://formspree.io/f/mwpbrjoz', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(contactForm),
            });

            const data = await res.json();

            if (data.ok) {
              setFormStatus('success');
              setContactForm({ name: '', email: '', message: '' });
              // Optionally auto close modal after delay:
              // setTimeout(() => setShowContact(false), 4000);
            } else {
              setFormStatus('error');
            }
          } catch (err) {
            console.error(err);
            setFormStatus('error');
          }
        }}
        className="flex flex-col gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={contactForm.name}
          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
          required
          className="border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={contactForm.email}
          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
          required
          className="border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={contactForm.message}
          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
          required
          className="border border-white/50 bg-white/10 text-white placeholder-white px-4 py-3 rounded-md resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#ee5225]"
        />

        <button
          type="submit"
          disabled={formStatus === 'sending'}
          className="bg-[#ee5225] text-white py-3 rounded-md hover:bg-[#d9431d] transition font-semibold text-lg disabled:opacity-50"
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
    </div>
  );
}