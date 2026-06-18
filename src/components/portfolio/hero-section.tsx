"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroData {
  greeting?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  resumeUrl?: string;
}

export function HeroSection({ data }: { data: HeroData }) {
  const hero = {
    greeting: data?.greeting || "Hello, I'm",
    name: data?.name || "Sai Kiran",
    title: data?.title || "Backend Developer & AI Engineer",
    subtitle: data?.subtitle || "Building Scalable Systems & Intelligent Applications",
    description:
      data?.description ||
      "Results-driven software developer specializing in backend systems, API architecture, and AI-integrated applications. Focused on writing clean, maintainable code that solves real problems at scale.",
    ctaText: data?.ctaText || "View My Projects",
    ctaLink: data?.ctaLink || "#projects",
    resumeUrl: data?.resumeUrl || "",
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Subtle accent glow behind avatar */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] hidden lg:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Text Content - Left Side */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <MotionWrapper delay={0}>
              <p className="text-sm font-medium text-accent tracking-wider uppercase mb-4 inline-flex items-center gap-2">
                <span className="w-8 h-[2px] bg-accent hidden lg:inline-block" />
                {hero.greeting}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground mb-4">
                {hero.name}
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <h2 className="text-xl sm:text-2xl font-medium text-accent mb-6">
                {hero.title}
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                {hero.description}
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href={hero.ctaLink}
                  className="btn-gradient rounded-lg px-8 py-3 text-sm font-medium inline-flex items-center gap-2"
                >
                  {hero.ctaText}
                </Link>
                {hero.resumeUrl && (
                  <a
                    href={hero.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-lg text-sm font-medium border border-border hover:border-accent/50 hover:bg-accent/5 transition-all inline-flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Resume
                  </a>
                )}
              </div>
            </MotionWrapper>
          </div>

          {/* 3D Avatar - Right Side */}
          <MotionWrapper delay={0.3} direction="right">
            <div className="flex-shrink-0 relative">
              <div className="avatar-float avatar-glow">
                <Image
                  src="/Avatar.png"
                  alt="Sai Kiran - Avatar"
                  width={420}
                  height={420}
                  className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] object-contain"
                  priority
                />
              </div>
              {/* Decorative ring behind avatar */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full border border-accent/10" />
              </div>
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-accent/5" />
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <MotionWrapper delay={0.6}>
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}
