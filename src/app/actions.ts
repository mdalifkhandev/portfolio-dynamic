"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Projects
export async function getProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createProject(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    link: formData.get("link") as string,
    gitlink: formData.get("gitlink") as string | undefined,
    tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
  }
  await prisma.project.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/projects")
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/projects")
}

// Skills
export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: 'asc' } })
}

export async function createSkill(data: { name: string; iconName: string; color: string }) {
  const count = await prisma.skill.count();
  await prisma.skill.create({ data: { ...data, order: count } })
  revalidatePath("/")
  revalidatePath("/admin/skills")
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/skills")
}

export async function updateSkill(id: string, data: { name: string; iconName: string; color: string }) {
  await prisma.skill.update({ where: { id }, data })
  revalidatePath("/")
  revalidatePath("/admin/skills")
}

export async function updateSkillsOrder(updates: { id: string, order: number }[]) {
  // MongoDB doesn't support easy bulk updates in Prisma natively, so we use a loop
  await Promise.all(
    updates.map(update => 
      prisma.skill.update({
        where: { id: update.id },
        data: { order: update.order }
      })
    )
  )
  revalidatePath("/")
  revalidatePath("/admin/skills")
}

// Experience
export async function getExperience() {
  return prisma.experience.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createExperience(data: { title: string; company: string; period: string; description: string }) {
  await prisma.experience.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/experience")
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/experience")
}

// Education
export async function getEducation() {
  return prisma.education.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createEducation(data: { degree: string; institution: string; period: string; status: string; score: string }) {
  await prisma.education.create({ data })
  revalidatePath("/")
  revalidatePath("/admin/education")
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/education")
}
