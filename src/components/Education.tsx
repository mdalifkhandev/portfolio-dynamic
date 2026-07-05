import { SectionTitle } from './ui/SectionTitle';
import { EducationCard } from './ui/EducationCard';
import { getEducation } from '@/app/actions';

export async function Education() {
  const educations = await getEducation();

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-8">
        <SectionTitle>Education</SectionTitle>
        <div className="max-w-4xl mx-auto space-y-6">
          {educations.length > 0 ? educations.map((edu) => (
            <EducationCard 
              key={edu.id} 
              degree={edu.degree}
              institution={edu.institution}
              period={edu.period}
              status={edu.status}
              score={edu.score}
            />
          )) : (
            <p className="text-gray-500 text-center">No education found. Add some from the Admin Dashboard.</p>
          )}
        </div>
      </div>
    </section>
  );
}