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

import dbConnect from "@/lib/db";
import Hero from "@/models/Hero";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Project from "@/models/Project";
import Achievement from "@/models/Achievement";
import Education from "@/models/Education";
import ContactInfo from "@/models/ContactInfo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let hero: any = null;
  let about: any = null;
  let skills: any[] = [];
  let experiences: any[] = [];
  let projects: any[] = [];
  let achievements: any[] = [];
  let education: any[] = [];
  let contact: any = null;

  try {
    await dbConnect();

    const [heroData, aboutData, skillsData, experiencesData, projectsData, achievementsData, educationData, contactData] =
      await Promise.all([
        Hero.findOne({ isActive: true }).lean(),
        About.findOne({ isActive: true }).lean(),
        Skill.find({ isActive: true }).sort({ category: 1, order: 1 }).lean(),
        Experience.find({ isActive: true }).sort({ order: 1, startDate: -1 }).lean(),
        Project.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean(),
        Achievement.find({ isActive: true }).sort({ order: 1, date: -1 }).lean(),
        Education.find({ isActive: true }).sort({ order: 1, startDate: -1 }).lean(),
        ContactInfo.findOne({ isActive: true }).lean(),
      ]);

    hero = heroData;
    about = aboutData;
    skills = skillsData;
    experiences = experiencesData;
    projects = projectsData;
    achievements = achievementsData;
    education = educationData;
    contact = contactData;
  } catch (error) {
    console.error("Error loading home page data directly from DB:", error);
  }

  // Next.js Server Components require plain serializable objects when passed to Client Components.
  // Mongoose lean() returns documents with ObjectId _id and Date objects, which causes serialization errors.
  const serialize = (obj: any) => (obj ? JSON.parse(JSON.stringify(obj)) : null);

  const serializedHero = serialize(hero);
  const serializedAbout = serialize(about);
  const serializedSkills = serialize(skills);
  const serializedExperiences = serialize(experiences);
  const serializedProjects = serialize(projects);
  const serializedAchievements = serialize(achievements);
  const serializedEducation = serialize(education);
  const serializedContact = serialize(contact);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection data={serializedHero || {}} />
        <AboutSection data={serializedAbout || {}} />
        <SkillsSection data={serializedSkills || []} />
        <ExperienceSection data={serializedExperiences || []} />
        <ProjectsSection data={serializedProjects || []} />
        <AchievementsSection data={serializedAchievements || []} />
        <EducationSection data={serializedEducation || []} />
        <ContactSection data={serializedContact || {}} />
      </main>
      <Footer contact={serializedContact || {}} />
    </>
  );
}
