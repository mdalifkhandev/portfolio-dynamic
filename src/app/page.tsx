import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { GitHub } from '@/components/GitHub';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-opacity duration-500">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHub />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
