import { LogoutButton } from "@/components/LogoutButton";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [projectsCount, skillsCount, experienceCount, educationCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.education.count(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your portfolio content</p>
          </div>
          <LogoutButton />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Projects" count={projectsCount} href="/admin/projects" />
          <DashboardCard title="Skills" count={skillsCount} href="/admin/skills" />
          <DashboardCard title="Experience" count={experienceCount} href="/admin/experience" />
          <DashboardCard title="Education" count={educationCount} href="/admin/education" />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, count, href }: { title: string, count: number, href: string }) {
  return (
    <a href={href} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{count}</p>
      <p className="text-sm text-gray-500 mt-1">Click to manage</p>
    </a>
  );
}
