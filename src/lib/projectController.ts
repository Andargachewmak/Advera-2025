import { Project } from '@prisma/client'; // Or your model
import prisma from './db'; // your Prisma or DB connection

export async function getProjects(): Promise<Project[]> {
  return await prisma.project.findMany();
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  return await prisma.project.create({ data });
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  return await prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
}
