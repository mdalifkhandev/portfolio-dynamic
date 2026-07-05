import { SectionTitle } from './ui/SectionTitle';
import { ProjectCard } from './ui/ProjectCard';
import { getProjects } from '@/app/actions';

export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-8">
        <SectionTitle>Projects</SectionTitle>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              gitlink={project.gitlink || ""}
              tags={project.tags}
            />
          )) : (
            <p className="text-gray-500">No projects found. Add some from the Admin Dashboard.</p>
          )}
        </div>
      </div>
    </section>
  );
}