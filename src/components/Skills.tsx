import { SectionTitle } from './ui/SectionTitle';
import { getSkills } from '@/app/actions';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import React from 'react';

// Helper to get icon component by string name
const getIcon = (iconName: string) => {
  if (iconName.startsWith('Si')) return (SiIcons as any)[iconName];
  if (iconName.startsWith('Fa')) return (FaIcons as any)[iconName];
  if (iconName.startsWith('Vsc')) return (VscIcons as any)[iconName];
  if (iconName.startsWith('Io')) return (Io5Icons as any)[iconName];
  if (iconName.startsWith('Md')) return (MdIcons as any)[iconName];
  return SiIcons.SiJavascript; // fallback
};

export async function Skills() {
  const skills = await getSkills();

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-8">
        <SectionTitle>Skills</SectionTitle>
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <div className="flex flex-wrap gap-6 justify-center">
              {skills.length > 0 ? skills.map((tech) => {
                const IconComponent = getIcon(tech.iconName);
                return (
                  <div
                    key={tech.id}
                    className="flex flex-col items-center p-2 sm:p-4 sm:border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform duration-300 transform hover:scale-110 cursor-pointer w-24 sm:w-28"
                  >
                    {IconComponent && <IconComponent size={40} color={tech.color} />}
                    <span className="text-sm font-medium text-center text-gray-800 dark:text-gray-200 mt-2">
                      {tech.name}
                    </span>
                  </div>
                )
              }) : (
                <p className="text-gray-500">No skills found. Add some from the Admin Dashboard.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
