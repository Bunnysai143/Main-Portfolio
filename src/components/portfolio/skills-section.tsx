"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

export function SkillsSection({ data }: { data: Skill[] }) {
  // Group skills by category
  const grouped = data.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const categoryOrder = [
    "Programming Languages",
    "Backend Development",
    "Frontend Development",
    "Databases",
    "Tools & Platforms",
    "Development Practices",
    "Soft Skills",
    "Other",
  ];

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <section id="skills" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Technical Proficiency
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Skills & Technologies
            </h2>
          </div>
        </MotionWrapper>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sortedCategories.map((category) => (
            <MotionItem key={category}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {grouped[category].map((skill) => (
                      <Badge
                        key={skill._id}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {skill.name}
                      </Badge>
                    ))}
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
