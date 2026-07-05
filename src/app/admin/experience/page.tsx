import { getExperience, createExperience, deleteExperience } from "@/app/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function ExperienceAdmin() {
  const experiences = await getExperience();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Experience</h1>
            <Link href="/admin" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
          </div>
          <UserButton />
        </header>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
          <form action={async (formData) => {
            "use server"
            await createExperience({
              title: formData.get("title") as string,
              company: formData.get("company") as string,
              period: formData.get("period") as string,
              description: formData.get("description") as string,
            })
          }} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input type="text" name="company" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Period (e.g. 2021 - Present)</label>
              <input type="text" name="period" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (Supports multi-line bullet points)</label>
              <textarea name="description" rows={5} required className="w-full border p-2 rounded text-black"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Experience</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map(exp => (
            <div key={exp.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <p className="text-blue-600 font-medium mb-1">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
              <form action={async () => {
                "use server"
                await deleteExperience(exp.id)
              }}>
                <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
