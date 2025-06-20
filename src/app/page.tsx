'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { PROJECTS } from './data/projects';
import ServicesModal from './services/page';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Sidebar from '@/component/sidebar';
import TeamModal from '@/component/TeamModal';
import AboutModal from '@/component/AboutModal';
import FAQPage from '@/component/faqmodal';

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  contributors: string;
  summary: string;
  images: (string | StaticImageData)[];
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
      <div className="flex flex-grow">
        <div className="fixed top-0 left-0 h-screen w-20 lg:w-64 z-40">
          <Sidebar onSectionClick={handleNavigate} onFAQClick={() => setShowFAQModal(true)} />
        </div>

        <div className="absolute top-4 right-4 z-50 flex gap-4">
          {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => {
            const ariaLabels = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];
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

        <main className="ml-20 lg:ml-64 p-8 w-full bg-white text-black">
          <section id="projects" className="mb-20">
            <h2 className="text-2xl font-bold text-orange-500 font-mona">Projects</h2>
            <p className="text-gray-600 mt-2">Check out some of our featured work.</p>

            <div className="flex gap-4 mt-4 flex-wrap">
              {filterButtons.map((btnCategory) => (
                <button
                  key={btnCategory}
                  onClick={() => handleFilterChange(btnCategory)}
                  className={`px-5 py-2 rounded-full font-medium transition transform duration-200 ${
                    filter === btnCategory
                      ? 'bg-orange-500 text-white'
                      : 'bg-[#f1f2f2] text-black hover:bg-orange-100'
                  } active:scale-95`}
                >
                  {btnCategory}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
              {filteredProjects.map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`} // <-- unique key combining id and index
                  onClick={() => {
                    setSelectedProject(project);
                    setCurrentImageIndex(0);
                  }}
                  className="relative group cursor-pointer overflow-hidden shadow-lg transition-transform rounded-2xl duration-300 hover:scale-[1.03] hover:shadow-2xl"
                >
                  <div className="relative w-full h-52">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      draggable={false}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none z-10" />
                  <div className="absolute bottom-1 left-0 right-0 px-4 pb-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white">
                    <h3 className="text-lg font-semibold drop-shadow-sm">{project.title}</h3>
                    <p className="text-sm text-white/90 line-clamp-2 drop-shadow-sm">
                      {project.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === Footer Section at Bottom of Main Page === */}
          <footer className="w-full mt-12 bg-transparent">
            {/* Full-width top orange border */}
            <div className="w-full h-1 bg-[#ee5225]" />

            {/* Footer Content */}
            <div className="max-w-[2000px] mx-auto px-6 py-6 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-8 gap-x-12 justify-center w-full text-center">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center text-base">
                  <Image
                    src="/Image/advera2.svg"
                    alt="Advera Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto mb-6"
                    priority
                  />
                </div>

                {/* Contact Us */}
                <div className="text-base">
                  <h4 className="text-[#ee5225] font-semibold mb-4 text-xl">Contact Us</h4>
                  <p className="mb-2 text-[#191D49]">+251941922516</p>
                  <p className="mb-2 text-[#191D49]">adveracommunication@gmail.com</p>
                </div>

                {/* Location */}
                <div className="text-base">
                  <h4 className="text-[#ee5225] font-semibold mb-4 text-xl">Location</h4>
                  <p className="text-[#191D49]">
                    Lagare, ORDA Building 1st Floor
                    <br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>

                {/* Follow Us */}
                <div className="text-base">
                  <h4 className="text-[#ee5225] font-semibold mb-4 text-xl">Follow Us</h4>
                  <div className="flex justify-center gap-6 mt-3">
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook
                        className="hover:text-[#ee5225] cursor-pointer text-[#191D49]"
                        size={24}
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/adveracreatives/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram
                        className="hover:text-[#ee5225] cursor-pointer text-[#191D49]"
                        size={24}
                      />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <FaTwitter
                        className="hover:text-[#ee5225] cursor-pointer text-[#191D49]"
                        size={24}
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/adveracreative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin
                        className="hover:text-[#ee5225] cursor-pointer text-[#191D49]"
                        size={24}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Divider line */}
              <hr className="border-t border-gray-300 opacity-30 my-8 w-full" />

              {/* Copyright */}
              <div className="text-center text-sm text-gray-500 w-full">
                &copy; {new Date().getFullYear()} Advera Communication. All rights reserved.
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* === Modal Preview === */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-7xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-white text-3xl z-50 hover:text-[#ee5225] bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-100 transition"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Project Modal"
              >
                &times;
              </button>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-40 bg-[#f1f2f2]/20 hover:bg-[#f1f2f2]/50 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
                onClick={prevImage}
                aria-label="Previous Image"
              >
                <HiChevronLeft />
              </button>

              <div className="relative w-full h-96">
                <Image
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-40 bg-[#f1f2f2]/20 hover:bg-[#f1f2f2]/50 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
                onClick={nextImage}
                aria-label="Next Image"
              >
                <HiChevronRight />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2 z-40">
                {selectedProject.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 text-black">
              <div>
                <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">Client</h2>
                  <p>{selectedProject.client}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">Category</h2>
                  <p>{selectedProject.category}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold text-lg">Contributors</h2>
                  <p>{selectedProject.contributors}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Project Summary</h3>
                <p className="whitespace-pre-line mb-6">{selectedProject.summary}</p>

                <div className="bg-[#f1f2f2] p-6 rounded-xl border border-orange-100 relative">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Client Testimonial</h4>
                  <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                    “Working with this team was a seamless experience. Their attention to detail,
                    communication, and dedication to our vision made the final product stand out. We couldn’t
                    be happier with the results.”
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/Image/abela.jpg"
                      alt="Client"
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-orange-300 shadow"
                    />
                    <div>
                      <p className="text-base font-semibold text-gray-800">Jane Doe</p>
                      <p className="text-sm text-gray-500">CEO, Example Corp</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-2 inline-block px-4 py-2 bg-[#ee5225] text-white rounded hover:bg-orange-700 transition w-max"
              >
                Back to Projects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Other Modals === */}
      {showTeamModal && <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />}
      {showAboutModal && <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />}
      {showServicesModal && <ServicesModal onClose={() => setShowServicesModal(false)} />}
      {showFAQModal && <FAQPage isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />}
    </div>
  );
}
