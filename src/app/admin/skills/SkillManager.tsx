"use client";

import { useState } from "react";
import { SkillForm } from "./SkillForm";
import { SkillListEditor } from "./SkillListEditor";

interface Skill {
  id: string;
  name: string;
  iconName: string;
  color: string;
  order: number;
}

interface Props {
  initialSkills: Skill[];
  createAction: (data: { name: string; iconName: string; color: string }) => Promise<void>;
  updateAction: (id: string, data: { name: string; iconName: string; color: string }) => Promise<void>;
  updateOrderAction: (updates: { id: string; order: number }[]) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
}

export function SkillManager({ initialSkills, createAction, updateAction, updateOrderAction, deleteAction }: Props) {
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingSkill ? "Edit Skill" : "Add New Skill"}
        </h2>
        <SkillForm 
          editingSkill={editingSkill}
          clearEdit={() => setEditingSkill(null)}
          createAction={createAction} 
          updateAction={updateAction}
        />
      </div>

      <SkillListEditor 
        initialSkills={initialSkills} 
        updateOrderAction={updateOrderAction}
        deleteAction={deleteAction}
        onEdit={(skill) => setEditingSkill(skill)}
      />
    </>
  );
}
