import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a User
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: passwordHash,
    },
  });
  console.log(`User created: ${user.email} (Password: password123)`);

  // 2. Create Projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Prisma, and Stripe integration.',
      image: 'https://via.placeholder.com/600x400',
      link: 'https://example.com/ecommerce',
      gitlink: 'https://github.com/example/ecommerce',
      tags: ['Next.js', 'React', 'Prisma', 'Stripe'],
    },
    {
      title: 'Task Management App',
      description: 'A real-time task management application with drag-and-drop features.',
      image: 'https://via.placeholder.com/600x400',
      link: 'https://example.com/taskapp',
      gitlink: 'https://github.com/example/taskapp',
      tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log('Projects created');

  // 3. Create Skills
  const skills = [
    { name: 'React', iconName: 'FaReact', color: '#61DAFB' },
    { name: 'Next.js', iconName: 'SiNextdotjs', color: '#000000' },
    { name: 'Node.js', iconName: 'FaNodeJs', color: '#339933' },
    { name: 'TypeScript', iconName: 'SiTypescript', color: '#3178C6' },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log('Skills created');

  // 4. Create Experience
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - Present',
      description: 'Lead the frontend team in developing responsive web applications using React and Next.js.',
    },
    {
      title: 'Web Developer',
      company: 'Creative Agency',
      period: '2019 - 2021',
      description: 'Developed and maintained various client websites using modern web technologies.',
    }
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log('Experiences created');

  // 5. Create Education
  const educations = [
    {
      degree: 'BSc in Computer Science',
      institution: 'University of Technology',
      period: '2015 - 2019',
      status: 'Graduated',
      score: '3.8/4.0 CGPA',
    }
  ];

  for (const edu of educations) {
    await prisma.education.create({ data: edu });
  }
  console.log('Education created');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
