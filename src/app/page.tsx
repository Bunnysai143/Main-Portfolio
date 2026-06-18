import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { AchievementsSection } from "@/components/portfolio/achievements-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ContactSection } from "@/components/portfolio/contact-section";

export const dynamic = "force-dynamic";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(`${baseUrl}/api/${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [hero, about, skills, experiences, projects, achievements, education, contact] =
    await Promise.all([
      fetchData("hero"),
      fetchData("about"),
      fetchData("skills"),
      fetchData("experiences"),
      fetchData("projects"),
      fetchData("achievements"),
      fetchData("education"),
      fetchData("contact"),
    ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection data={hero || {}} />
        <AboutSection data={about || {}} />
        <SkillsSection data={skills || []} />
        <ExperienceSection data={experiences || []} />
        <ProjectsSection data={projects || []} />
        <AchievementsSection data={achievements || []} />
        <EducationSection data={education || []} />
        <ContactSection data={contact || {}} />
      </main>
      <Footer contact={contact || {}} />
    </>
  );
}
