import { getEducation, createEducation, deleteEducation } from "@/app/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function EducationAdmin() {
  const educations = await getEducation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Education</h1>
            <Link href="/admin" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
          </div>
          <UserButton />
        </header>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Education</h2>
          <form action={async (formData) => {
            "use server"
            await createEducation({
              degree: formData.get("degree") as string,
              institution: formData.get("institution") as string,
              period: formData.get("period") as string,
              status: formData.get("status") as string,
              score: formData.get("score") as string,
            })
          }} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <input type="text" name="degree" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Institution</label>
              <input type="text" name="institution" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Period</label>
              <input type="text" name="period" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status (e.g. Running, GPA- 4.67)</label>
              <input type="text" name="status" required className="w-full border p-2 rounded text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Score (e.g. 100%, N/A)</label>
              <input type="text" name="score" required className="w-full border p-2 rounded text-black" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Education</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map(edu => (
            <div key={edu.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <p className="text-blue-600 font-medium mb-1">{edu.institution}</p>
              <p className="text-sm text-gray-500 mb-2">{edu.period} | {edu.status}</p>
              <form action={async () => {
                "use server"
                await deleteEducation(edu.id)
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
