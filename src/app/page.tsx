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
import Sidebar from '@/component/sidebar';
import AboutModal from '@/component/AboutModal';
import FAQPage from '@/component/faqmodal';
import ServicesModal from '@/component/ServicesModal';
import TeamModal from '@/component/TeamModal';
import { motion } from 'framer-motion';

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

  const logos = [
    { src: '/Image/logo1.svg', alt: 'Navan', width: 200, height: 50 },
    { src: '/Image/logo2.svg', alt: 'Contentful', width: 200, height: 50 },
    { src: '/Image/logo3.svg', alt: 'Unilever', width: 200, height: 50 },
    { src: '/Image/logo4.svg', alt: 'Stack Overflow', width: 200, height: 50 },
    { src: '/Image/logo5.svg', alt: 'Riot Games', width: 200, height: 50 },
    { src: '/Image/logo6.svg', alt: 'Nike', width: 200, height: 50 },
  ];

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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Responsive Menu Bar */}
<div className="menu-bar">
  <div className="logo">
    <Image
      src="/Image/adv.svg"
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

      <div className="flex flex-grow">
        <div className="fixed top-0 left-0 h-screen w-20 lg:w-64 z-40">
          <Sidebar onSectionClick={handleNavigate} onFAQClick={() => setShowFAQModal(true)} />
        </div>

<main className="ml-0 sm:ml-20 lg:ml-45 p-8 w-full bg-white text-black">
  <section id="projects" className="mb-20">
    <h1 className="text-4xl font-extrabold text-[#ee5225] font-mona">Projects</h1>
    <p className="text-gray-600 mt-2">Check out some of our featured work.</p>

    <div className="flex gap-5 mt-4 flex-wrap ml-7">
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

    {/* Logo Slider */}
<div className="logo-marquee-wrapper">
  <motion.div
    className="logo-marquee"
    animate={{ x: ['0%', '-50%'] }}
    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
  >
    {[...logos, ...logos].map((logo, idx) => (
      <div key={`${logo.alt}-${idx}`} className="logo-item">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className=""
          draggable={false}
          priority={idx < logos.length}
        />
      </div>
    ))}
  </motion.div>
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
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4"
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="bg-white w-full h-full overflow-y-auto shadow-lg relative rounded-none"
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
      


      {/* Other Modals */}
      {showTeamModal && <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />}
      {showAboutModal && <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />}
      {showServicesModal && <ServicesModal onClose={() => setShowServicesModal(false)} />}
      {showFAQModal && <FAQPage isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />}
    </div>
  );
}