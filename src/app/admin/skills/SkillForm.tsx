"use client";

import { useState, useEffect } from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as VscIcons from "react-icons/vsc";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as simpleIcons from "simple-icons";
import { SubmitButton } from "@/components/SubmitButton";

// Helper to get icon component by string name
const getIcon = (iconName: string) => {
  if (!iconName) return null;
  if (iconName.startsWith("Si")) return (SiIcons as any)[iconName] || SiIcons.SiJavascript;
  if (iconName.startsWith("Fa")) return (FaIcons as any)[iconName] || SiIcons.SiJavascript;
  if (iconName.startsWith("Vsc")) return (VscIcons as any)[iconName] || SiIcons.SiJavascript;
  if (iconName.startsWith("Io")) return (Io5Icons as any)[iconName] || SiIcons.SiJavascript;
  if (iconName.startsWith("Md")) return (MdIcons as any)[iconName] || SiIcons.SiJavascript;
  return SiIcons.SiJavascript; // fallback
};

const siIconNames = Object.keys(SiIcons);

export function SkillForm({ 
  editingSkill, 
  clearEdit, 
  createAction, 
  updateAction 
}: { 
  editingSkill?: any;
  clearEdit?: () => void;
  createAction: (data: { name: string; iconName: string; color: string }) => Promise<void>;
  updateAction?: (id: string, data: any) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [iconName, setIconName] = useState("");
  const [color, setColor] = useState("#f7df1e");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name);
      setIconName(editingSkill.iconName);
      setColor(editingSkill.color);
    } else {
      setName("");
      setIconName("");
      setColor("#f7df1e");
    }
  }, [editingSkill]);

  const IconComponent = getIcon(iconName || "SiJavascript");
  const filteredIcons = iconName 
    ? siIconNames.filter(icon => icon.toLowerCase().includes(iconName.toLowerCase()))
    : siIconNames;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form action={async (formData) => {
        if (editingSkill && updateAction) {
          await updateAction(editingSkill.id, {
            name: formData.get("name") as string,
            iconName: formData.get("iconName") as string,
            color: formData.get("color") as string,
          });
          if (clearEdit) clearEdit();
        } else {
          await createAction({
            name: formData.get("name") as string,
            iconName: formData.get("iconName") as string,
            color: formData.get("color") as string,
          });
          setName("");
          setIconName("");
          setColor("#f7df1e");
        }
      }} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Icon Name (e.g. SiJavascript)</label>
          <input 
            type="text" 
            name="iconName" 
            required 
            value={iconName}
            onChange={(e) => {
              setIconName(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
          />
          {showSuggestions && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {filteredIcons.slice(0, 100).map((icon) => (
                <li 
                  key={icon} 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  onClick={() => {
                    setIconName(icon);
                    setShowSuggestions(false);
                    // Look up color in simple-icons
                    const siKey = "si" + icon.slice(2);
                    const siData = (simpleIcons as any)[siKey];
                    if (siData && siData.hex) {
                      setColor("#" + siData.hex);
                    }
                  }}
                >
                  {icon}
                </li>
              ))}
              {filteredIcons.length === 0 && (
                <li className="px-4 py-2 text-sm text-gray-500">No icons found</li>
              )}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color (Hex Code)</label>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              name="color" 
              placeholder="#f7df1e" 
              required 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 border p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-10 rounded cursor-pointer border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shrink-0"
              title="Choose Color"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <SubmitButton className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingSkill ? "Update Skill" : "Add Skill"}
          </SubmitButton>
          {editingSkill && clearEdit && (
            <button 
              type="button" 
              onClick={clearEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <label className="block text-sm font-medium mb-4 text-gray-500">Live Preview</label>
        <div className="flex justify-start">
          <div className="flex flex-col items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 w-28">
            {IconComponent && <IconComponent size={40} color={color || "#f7df1e"} />}
            <span className="text-sm font-medium text-center text-gray-800 dark:text-gray-200 mt-2">
              {name || "Skill Name"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
