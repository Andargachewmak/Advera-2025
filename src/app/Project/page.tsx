'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { PROJECTS } from '../data/projects';
import { useRouter } from 'next/navigation';

type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  contributors: string;
  summary: string;
  images: (string | StaticImageData)[];
};

const categories = [
  'Graphics (Logo, Poster)',
  'Web development',
  'UI/UX Design',
];

export default function ProjectsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>(categories[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = PROJECTS.filter((project) => project.category === filter);

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % (selectedProject?.images.length ?? 1));

  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      (prev - 1 + (selectedProject?.images.length ?? 1)) % (selectedProject?.images.length ?? 1)
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <button
        onClick={() => router.back()}
        className="mb-4 text-orange-500 hover:text-orange-300 underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold text-orange-500">Projects</h2>
      <p className="text-gray-400 mt-2">Check out some of our featured work.</p>

      <div className="flex gap-4 mt-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded ${
              filter === category ? 'bg-orange-500' : 'bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white text-black rounded-lg overflow-hidden shadow hover:scale-105 transform transition cursor-pointer"
            onClick={() => {
              setSelectedProject(project);
              setCurrentImageIndex(0);
            }}
          >
            <div className="relative w-full h-48">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.summary.slice(0, 60)}...</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl z-50 bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-90 transition"
            onClick={() => setSelectedProject(null)}
          >
            &times;
          </button>
          <div
            className="bg-black max-w-7xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Carousel */}
            <div className="relative">
              <button
                className="absolute top-4 left-4 text-white text-3xl z-50"
                onClick={prevImage}
              >
                &#60;
              </button>
              <div className="relative w-full h-96">
                <Image
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <button
                className="absolute top-4 right-4 text-white text-3xl z-50"
                onClick={nextImage}
              >
                &#62;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 text-white">
              <div>
                <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
                <p className="mb-4"><strong>Client:</strong> {selectedProject.client}</p>
                <p className="mb-4"><strong>Category:</strong> {selectedProject.category}</p>
                <p className="mb-4"><strong>Contributors:</strong> {selectedProject.contributors}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Project Summary</h3>
                <p className="whitespace-pre-line">{selectedProject.summary}</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Gallery</h3>
              <div className="grid grid-cols-4 gap-4">
                {selectedProject.images.map((image, index) => {
                  const isLargeImage = index === 0 || index === selectedProject.images.length - 1;
                  return (
                    <div
                      key={index}
                      className={`overflow-hidden rounded-lg border-2 border-white transition-transform duration-300 hover:scale-110 cursor-pointer ${
                        isLargeImage ? 'col-span-2 row-span-2' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <div className="relative h-32 sm:h-48">
                        <Image
                          src={image}
                          alt={`${selectedProject.title} - ${index}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
