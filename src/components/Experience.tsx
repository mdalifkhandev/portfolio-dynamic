import { SectionTitle } from './ui/SectionTitle';
import { Timeline } from './ui/Timeline';
import { getExperience } from '@/app/actions';

export async function Experience() {
  const experiences = await getExperience();

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-8">
        <SectionTitle>Experience</SectionTitle>
        {experiences.length > 0 ? (
          <Timeline items={experiences} />
        ) : (
          <p className="text-gray-500 text-center">No experience found. Add some from the Admin Dashboard.</p>
        )}
      </div>
    </section>
  );
}