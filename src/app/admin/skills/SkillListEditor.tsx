"use client";

import { useState, useTransition, useEffect } from "react";
import { IconRenderer } from "@/components/IconRenderer";
import { SubmitButton } from "@/components/SubmitButton";

interface Skill {
  id: string;
  name: string;
  iconName: string;
  color: string;
  order: number;
}

interface Props {
  initialSkills: Skill[];
  updateOrderAction: (updates: { id: string; order: number }[]) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
  onEdit: (skill: Skill) => void;
}

export function SkillListEditor({ initialSkills, updateOrderAction, deleteAction, onEdit }: Props) {
  const [skills, setSkills] = useState(initialSkills);
  const [isPending, startTransition] = useTransition();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Required to allow drop
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newSkills = [...skills];
    const draggedItem = newSkills[draggedIndex];
    
    newSkills.splice(draggedIndex, 1);
    newSkills.splice(index, 0, draggedItem);
    
    setSkills(newSkills);
    setIsDirty(true);
    setDraggedIndex(null);
  };

  const saveOrder = () => {
    startTransition(async () => {
      const updates = skills.map((skill, index) => ({
        id: skill.id,
        order: index,
      }));
      await updateOrderAction(updates);
      setIsDirty(false);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Saved Skills</h2>
        <button 
          onClick={saveOrder}
          disabled={!isDirty || isPending}
          className={`px-4 py-2 rounded text-white font-medium ${
            !isDirty 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPending ? "Saving..." : "Save Order"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <div 
            key={skill.id} 
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center relative group cursor-grab active:cursor-grabbing ${
              draggedIndex === index ? "opacity-50 border-blue-500 border-dashed" : ""
            }`}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400">
              <span title="Drag to reorder">⠿</span>
            </div>

            <div className="mb-3 mt-4">
              <IconRenderer iconName={skill.iconName} color={skill.color} size={40} />
            </div>
            <h3 className="font-bold text-sm text-center mb-2">{skill.name}</h3>
            <div className="flex gap-2 mt-2 w-full justify-center">
              <button 
                onClick={() => onEdit(skill)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (confirm("Are you sure you want to delete this skill?")) {
                    deleteAction(skill.id);
                  }
                }}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
