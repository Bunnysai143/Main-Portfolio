"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star } from "lucide-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  award: Award,
  star: Star,
};

export function AchievementsSection({ data }: { data: Achievement[] }) {
  return (
    <section id="achievements" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Recognition
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Achievements
            </h2>
          </div>
        </MotionWrapper>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            return (
              <MotionItem key={achievement._id}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-accent/10 shrink-0">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1.5">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionItem>
            );
          })}
        </MotionContainer>
      </div>
    </section>
  );
}
