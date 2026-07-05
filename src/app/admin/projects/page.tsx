import { getProjects, createProject, deleteProject } from "@/app/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";

export default async function ProjectsAdmin() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Projects</h1>
            <Link href="/admin" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
          </div>
          <UserButton />
        </header>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <form action={createProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" required className="w-full border p-2 rounded text-black"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="text" name="image" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Live Link</label>
              <input type="text" name="link" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link (optional)</label>
              <input type="text" name="gitlink" className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" placeholder="React, Node, Tailwind" className="w-full border p-2 rounded text-black" />
            </div>
            <SubmitButton className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" loadingText="Adding...">Add Project</SubmitButton>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg truncate">{project.title}</h3>
              <p className="text-sm text-gray-500 truncate mb-4">{project.description}</p>
              <form action={async () => {
                "use server"
                await deleteProject(project.id)
              }}>
                <SubmitButton className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600" loadingText="Deleting...">Delete</SubmitButton>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
