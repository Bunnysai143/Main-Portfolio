"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Trophy, Award, Star, Medal, Zap, Target, Crown, Flame, RotateCw, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { formatDateShort } from "@/lib/utils";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  icon: string;
  date?: string | Date;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  award: Award,
  star: Star,
  medal: Medal,
  zap: Zap,
  target: Target,
  crown: Crown,
  flame: Flame,
};

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[achievement.icon] || Trophy;

  return (
    <div 
      className="group [perspective:1000px] h-60 w-full cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass-card card-glow rounded-2xl p-6 flex flex-col justify-between overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-300">
          {/* Background Index Number */}
          <span className="absolute top-4 right-4 text-5xl font-bold text-accent/5 font-display select-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 pr-6">
              <h3 className="font-display font-bold text-foreground text-lg leading-tight tracking-tight mt-1">
                {achievement.title}
              </h3>
              {achievement.date && (
                <span className="text-xs text-accent font-medium mt-1 block">
                  {formatDateShort(achievement.date)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40 mt-auto">
            <span className="inline-flex items-center gap-1.5 font-medium text-accent">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
              Earned Milestone
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider hover:text-accent transition-colors">
              Details
              <RotateCw className="h-3 w-3 transition-transform group-hover:rotate-45" />
            </span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass-card rounded-2xl p-6 flex flex-col justify-between border-2 border-accent/30 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-accent tracking-wider uppercase mb-2">
              Milestone Details
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {achievement.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/40 mt-4">
            {achievement.date && (
              <span className="text-xs font-semibold text-foreground">
                Date: {formatDateShort(achievement.date)}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider hover:text-accent transition-colors">
              Flip Back
              <RotateCw className="h-3 w-3 -scale-x-100" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementsSection({ data }: { data: Achievement[] }) {
  return (
    <section id="achievements" className="py-20 lg:py-28 bg-muted/10 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-dots opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Key Milestones
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Honors & Achievements
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Explore key moments, awards, and milestones. Click any card to reveal details.
            </p>
          </div>
        </MotionWrapper>

        {data.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No achievements listed yet.
          </div>
        ) : (
          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.map((achievement, index) => (
              <MotionItem key={achievement._id}>
                <AchievementCard achievement={achievement} index={index} />
              </MotionItem>
            ))}
          </MotionContainer>
        )}
      </div>
    </section>
  );
}
