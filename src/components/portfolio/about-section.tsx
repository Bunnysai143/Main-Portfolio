"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Briefcase, FolderOpen, Wrench } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AboutData {
  title?: string;
  description?: string;
  longDescription?: string;
  yearsOfExperience?: number;
  projectsCompleted?: number;
  technologiesUsed?: number;
}

function CounterAnimation({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl font-display text-accent font-bold">
      {count}{suffix}
    </span>
  );
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
      value: about.yearsOfExperience,
      label: "Years Experience",
    },
    {
      icon: FolderOpen,
      value: about.projectsCompleted,
      label: "Projects Built",
    },
    {
      icon: Wrench,
      value: about.technologiesUsed,
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
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              {about.title}
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
          </div>
        </MotionWrapper>

        <div className="max-w-3xl mx-auto">
          <MotionWrapper delay={0.1}>
            <p className="text-base text-muted-foreground leading-relaxed mb-6 border-l-2 border-accent/30 pl-4">
              {about.description}
            </p>
          </MotionWrapper>

          {about.longDescription && (
            <MotionWrapper delay={0.2}>
              <p className="text-base text-muted-foreground leading-relaxed mb-12 border-l-2 border-accent/30 pl-4">
                {about.longDescription}
              </p>
            </MotionWrapper>
          )}

          <MotionContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <MotionItem key={stat.label}>
                <div className="glass-card card-glow rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CounterAnimation target={stat.value} suffix="+" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionContainer>
        </div>
      </div>
    </section>
  );
}
