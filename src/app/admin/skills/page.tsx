import { getSkills, createSkill, deleteSkill, updateSkill, updateSkillsOrder } from "@/app/actions";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SkillManager } from "./SkillManager";

export const dynamic = 'force-dynamic';

export default async function SkillsAdmin() {
  const skills = await getSkills();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Skills</h1>
            <Link href="/admin" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
          </div>
          <UserButton />
        </header>

        <SkillManager 
          initialSkills={skills.map((s: any) => ({ ...s, order: s.order || 0 }))}
          createAction={async (data) => {
            "use server"
            await createSkill(data);
          }}
          updateAction={async (id, data) => {
            "use server"
            await updateSkill(id, data);
          }}
          updateOrderAction={async (updates) => {
            "use server"
            await updateSkillsOrder(updates);
          }}
          deleteAction={async (id) => {
            "use server"
            await deleteSkill(id);
          }}
        />
      </div>
    </div>
  );
}
