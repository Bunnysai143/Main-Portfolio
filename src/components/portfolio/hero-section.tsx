"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";

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
    ctaText: data?.ctaText || "View My Work",
    ctaLink: data?.ctaLink || "#projects",
    resumeUrl: data?.resumeUrl || "",
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <MotionWrapper delay={0}>
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-4">
              {hero.greeting}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              {hero.name}
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              {hero.title}
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              {hero.description}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link href={hero.ctaLink}>{hero.ctaText}</Link>
              </Button>
              {hero.resumeUrl && (
                <Button variant="outline" size="lg" asChild className="px-8">
                  <a href={hero.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              )}
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <MotionWrapper delay={0.6}>
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}
