import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const heroSchema = z.object({
  greeting: z.string().min(1, "Greeting is required"),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  resumeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  profileImage: z.string().optional(),
});

export const aboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  image: z.string().optional(),
  yearsOfExperience: z.coerce.number().min(0).default(0),
  projectsCompleted: z.coerce.number().min(0).default(0),
  technologiesUsed: z.coerce.number().min(0).default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.coerce.number().min(0).max(100).default(80),
  icon: z.string().optional(),
  order: z.coerce.number().default(0),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  type: z.string().min(1, "Type is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  order: z.coerce.number().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  image: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  liveUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
  category: z.enum(["Full Stack", "Backend", "Frontend", "AI/ML", "DevOps", "Other"]).default("Full Stack"),
  featured: z.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional(),
  date: z.string().optional(),
  order: z.coerce.number().default(0),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field is required"),
  grade: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  order: z.coerce.number().default(0),
});

export const contactInfoSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().url("Must be valid URL").optional().or(z.literal("")),
  github: z.string().url("Must be valid URL").optional().or(z.literal("")),
  leetcode: z.string().url("Must be valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be valid URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Must be valid URL").optional().or(z.literal("")),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type HeroInput = z.infer<typeof heroSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
