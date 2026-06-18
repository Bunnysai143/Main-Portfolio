"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  grade: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  achievements: string[];
}

export function EducationSection({ data }: { data: Education[] }) {
  return (
    <section id="education" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Academic Background
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Education
            </h2>
          </div>
        </MotionWrapper>

        <MotionContainer className="max-w-3xl mx-auto space-y-6">
          {data.map((edu) => (
            <MotionItem key={edu._id}>
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-accent/10 shrink-0">
                      <GraduationCap className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="text-sm font-medium text-accent">
                            {edu.institution}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>
                            {formatDateShort(edu.startDate)} –{" "}
                            {edu.isCurrent
                              ? "Present"
                              : edu.endDate
                                ? formatDateShort(edu.endDate)
                                : "Present"}
                          </span>
                        </div>
                      </div>

                      {edu.grade && (
                        <Badge variant="secondary" className="mb-3 text-xs">
                          {edu.grade}
                        </Badge>
                      )}

                      {edu.description && (
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {edu.description}
                        </p>
                      )}

                      {edu.achievements.length > 0 && (
                        <ul className="space-y-1.5">
                          {edu.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                              {ach}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionItem>
          ))}
        </MotionContainer>
      </div>
    </section>
  );
}
