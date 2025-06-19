'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Sidebar from './Header/page';
import { PROJECTS } from './data/projects';
import TeamModal from './Team/page';
import AboutModal from './about/page';
import ServicesModal from './services/page';
import { FaFacebook, FaInstagram, FaTwitter, FaQuoteLeft,FaLinkedin } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import FAQPage from './FAQ/page';
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFilter = localStorage.getItem('selectedFilter');
      if (storedFilter && filterButtons.includes(storedFilter)) {
        setFilter(storedFilter);
      }
    }
  }, []);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedFilter', category);
    }
  };

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter(
          (project) => project.category.toLowerCase() === filter.toLowerCase()
        );

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
        <Sidebar onSectionClick={handleNavigate} onFAQClick={() => setShowFAQModal(true)} />

        {/* Social Icons */}
        <div className="fixed top-4 right-4 z-50 flex gap-4">
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
                <Icon className="text-black hover:text-orange-500 transition" size={20} />
              </a>
            );
          })}
        </div>

        <main className="ml-20 lg:ml-0 p-8 w-full bg-white text-black">
          <section id="projects" className="mb-20">
            <h2 className="text-2xl font-extrabold text-orange-500 font-mona">
                Projects
              </h2>

            <p className="text-gray-600 mt-2">Check out some of our featured work.</p>

            {/* Filter Buttons */}
            <div className="flex gap-4 mt-4 flex-wrap">
              {filterButtons.map((btnCategory) => (
                <button
                  key={btnCategory}
                  onClick={() => handleFilterChange(btnCategory)}
                  className={`px-4 py-2 rounded ${
                    filter === btnCategory ? 'bg-orange-500 text-white' : 'bg-[#191D49]/40 text-white'
                  }`}
                >
                  {btnCategory}
                </button>
              ))}
            </div>

              {/* Project Cards with fancy hover and bottom-aligned content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-8">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }}
                      className="relative group cursor-pointer overflow-hidden shadow-lg transition-transform rounded-2xl duration-300 hover:scale-[1.03] hover:shadow-2xl"
                    >
                      {/* Image */}
                      <div className="relative w-full h-52">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          draggable={false}
                        />
                      </div>

                      {/* Dark Fade Overlay - slightly higher (60% height) */}
                      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none z-10" />

                      {/* Text content - appears on hover */}
                      <div className="absolute bottom-6 left-0 right-0 px-4 pb-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-white">
                        <h3 className="text-lg font-semibold drop-shadow-sm">{project.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-sm">{project.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </section>
        </main>
      </div>

      {/* Modal Preview */}

{selectedProject && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
    onClick={() => setSelectedProject(null)}
  >
    <button
      className="absolute top-6 right-6 text-white text-3xl z-50 bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedProject(null);
      }}
      aria-label="Close Project Modal"
    >
      &times;
    </button>

    <div
      className="bg-white max-w-7xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* === Main Image Preview === */}
      <div className="relative">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-[#ee5225] hover:bg-orange-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
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
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-[#ee5225] hover:bg-orange-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition"
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
                  ? 'bg-[#ee5225] scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* === Details Section === */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 text-black">
  {/* Left: Project Info */}
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

  {/* Right: Summary + Testimonial */}
  <div>
    <h3 className="text-2xl font-bold mb-2">Project Summary</h3>
    <p className="whitespace-pre-line mb-6">{selectedProject.summary}</p>

    {/* Aligned Testimonial Box */}
    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 relative">
      <h4 className="text-lg font-bold text-gray-800 mb-4">Client Testimonial</h4>

      {/* Quotation Icon */}
      <FaQuoteLeft className="absolute top-6 left-6 w-8 h-8 text-orange-300 opacity-30" />

      <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
        “Working with this team was a seamless experience. Their attention to detail, communication, and
        dedication to our vision made the final product stand out. We couldn’t be happier with the results.”
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
      {/* Footer */}
      <footer className="w-full bg-gray-800 text-gray-300 p-6">
        <div className="max-w-[calc(100%-2rem)] lg:max-w-[calc(100%-16rem)] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-8 gap-x-12 justify-center">
            {/* Logo - first */}
            <div className="flex flex-col items-center justify-center text-base">
              <Image
                src="/Image/advera1.svg"
                alt="Advera Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-6"
                priority
              />
            </div>

            {/* Quick Links */}
            <div className="text-base text-center sm:text-left">
              <h4 className="text-orange-500 font-semibold mb-4 text-xl">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-orange-400 transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowAboutModal(true)}
                    className="hover:text-orange-400 transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowServicesModal(true)}
                    className="hover:text-orange-400 transition"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowTeamModal(true)}
                    className="hover:text-orange-400 transition"
                  >
                    Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowFAQModal(true)}
                    className="hover:text-orange-400 transition"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="text-base text-center sm:text-left">
              <h4 className="text-orange-500 font-semibold mb-4 text-xl">Contact Us</h4>
              <p className="mb-2">22 Street, Addis Ababa</p>
              <p className="mb-2">Phone: 0966557743</p>
              <p className="mb-2">Email: mail@gmail.com</p>
            </div>

            {/* Follow Us */}
            <div className="text-base text-center sm:text-left">
              <h4 className="text-orange-500 font-semibold mb-4 text-xl">Follow Us</h4>
              <div className="flex justify-center sm:justify-start gap-6 mt-3">
                <FaFacebook className="hover:text-orange-400 cursor-pointer" size={24} />
                <FaInstagram className="hover:text-orange-400 cursor-pointer" size={24} />
                <FaTwitter className="hover:text-orange-400 cursor-pointer" size={24} />
                <FaLinkedin className="hover:text-orange-400 cursor-pointer" size={24} />
              </div>
            </div>
          </div>

          <hr className="border-t border-white opacity-20 my-8" />

          <div className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Advera Communication. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showTeamModal && <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />}
      {showAboutModal && (
        <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      )}
      {showServicesModal && <ServicesModal onClose={() => setShowServicesModal(false)} />}
      {showFAQModal && <FAQPage />}
    </div>
  );
}
