// app/components/ProjectCard.tsx
import Image from "next/image";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-96 text-black">
      <div className="relative w-full h-48">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600">{project.summary}</p>
      </div>
    </div>
  );
}
