"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FolderOpen, Wrench } from "lucide-react";

interface AboutData {
  title?: string;
  description?: string;
  longDescription?: string;
  yearsOfExperience?: number;
  projectsCompleted?: number;
  technologiesUsed?: number;
}

export function AboutSection({ data }: { data: AboutData }) {
  const about = {
    title: data?.title || "About Me",
    description:
      data?.description ||
      "I'm a backend-focused software developer with a strong foundation in computer science and a specialization in AI. I build systems that are reliable, well-tested, and designed to scale.",
    longDescription:
      data?.longDescription ||
      "My approach to development centers on writing code that other engineers can read, test, and extend. I've worked across product teams to translate business requirements into clean technical solutions — from API design and data modeling to debugging production issues and optimizing query performance. I'm driven by the challenge of building things that actually work under real-world conditions.",
    yearsOfExperience: data?.yearsOfExperience || 1,
    projectsCompleted: data?.projectsCompleted || 5,
    technologiesUsed: data?.technologiesUsed || 15,
  };

  const stats = [
    {
      icon: Briefcase,
      value: `${about.yearsOfExperience}+`,
      label: "Years Experience",
    },
    {
      icon: FolderOpen,
      value: `${about.projectsCompleted}+`,
      label: "Projects Built",
    },
    {
      icon: Wrench,
      value: `${about.technologiesUsed}+`,
      label: "Technologies",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Background
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {about.title}
            </h2>
          </div>
        </MotionWrapper>

        <div className="max-w-3xl mx-auto">
          <MotionWrapper delay={0.1}>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {about.description}
            </p>
          </MotionWrapper>

          {about.longDescription && (
            <MotionWrapper delay={0.2}>
              <p className="text-base text-muted-foreground leading-relaxed mb-12">
                {about.longDescription}
              </p>
            </MotionWrapper>
          )}

          <MotionWrapper delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="text-center hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="pt-6">
                    <stat.icon className="h-6 w-6 mx-auto mb-3 text-accent" />
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
