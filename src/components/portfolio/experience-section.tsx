"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface Experience {
  _id: string;
  company: string;
  position: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export function ExperienceSection({ data }: { data: Experience[] }) {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Career Path
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Professional Experience
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
          </div>
        </MotionWrapper>

        <MotionContainer className="max-w-3xl mx-auto space-y-8 relative">
          {/* Connected timeline line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-accent/20 hidden md:block" />

          {data.map((exp) => (
            <MotionItem key={exp._id}>
              <div className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 shrink-0 hidden md:flex">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mt-6 ${
                      exp.isCurrent
                        ? "bg-accent animate-pulse"
                        : "bg-accent/10 border-2 border-accent"
                    }`}
                  >
                    <Briefcase className={`h-3 w-3 ${exp.isCurrent ? "text-white" : "text-accent"}`} />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`glass-card card-glow rounded-xl flex-1 p-6 ${
                    exp.isCurrent ? "border-l-2 border-l-accent" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {exp.position}
                      </h3>
                      <p className="text-base font-medium text-accent">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {formatDateShort(exp.startDate)} –{" "}
                          {exp.isCurrent
                            ? "Present"
                            : exp.endDate
                              ? formatDateShort(exp.endDate)
                              : "Present"}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {exp.type}
                      </Badge>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.responsibilities.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs hover:scale-105 transition-transform cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionContainer>
      </div>
    </section>
  );
}
