"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Award, 
  Trophy 
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

function PathConnector({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isCurveLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full h-24 md:h-32 my-1">
      {/* Desktop Curved Winding Path */}
      <svg
        className="hidden md:block absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Background dashed path */}
        <path
          d={isCurveLeft ? "M 50 0 C 15 25, 15 75, 50 100" : "M 50 0 C 85 25, 85 75, 50 100"}
          className="stroke-muted-foreground/25 fill-none"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        {/* Active glowing animated path */}
        <motion.path
          d={isCurveLeft ? "M 50 0 C 15 25, 15 75, 50 100" : "M 50 0 C 85 25, 85 75, 50 100"}
          className="stroke-accent fill-none"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Mobile Vertical Path */}
      <svg
        className="block md:hidden absolute left-6 top-0 w-4 h-full -translate-x-1/2"
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
      >
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          className="stroke-muted-foreground/25"
          strokeWidth="3"
          strokeDasharray="6 6"
        />
        <motion.path
          d="M 5 0 L 5 100"
          className="stroke-accent fill-none"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function NodeIcon({ index, total, isCurrent }: { index: number; total: number; isCurrent: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  let Icon = GraduationCap;
  if (index === 0) {
    Icon = BookOpen;
  } else if (isCurrent || index === total - 1) {
    Icon = Trophy;
  } else if (index % 2 === 1) {
    Icon = Award;
  }

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Outer pulsing ring for active/current milestone */}
      {isCurrent && (
        <span className="absolute -inset-2 rounded-full bg-accent/30 animate-pulse border border-accent/40" />
      )}
      
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.15,
        }}
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 z-10 transition-shadow duration-300 ${
          isCurrent
            ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            : "bg-background border-accent text-accent shadow-sm"
        }`}
      >
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </motion.div>
    </div>
  );
}

function EducationCard({ edu }: { edu: Education }) {
  return (
    <div className={`glass-card card-glow rounded-2xl overflow-hidden border border-border/50 hover:border-accent/40 transition-all duration-300 text-left`}>
      {/* Visual Indicator strip */}
      <div className={`h-1.5 w-full bg-accent/30 ${edu.isCurrent ? "bg-accent" : ""}`} />
      
      <div className="p-5 md:p-6">
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display font-semibold text-base md:text-lg text-foreground tracking-tight leading-snug">
              {edu.degree} in {edu.field}
            </h3>
            {edu.isCurrent && (
              <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 border border-accent/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Current
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs md:text-sm">
            <span className="font-medium text-accent">
              {edu.institution}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
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
        </div>

        {edu.grade && (
          <Badge className="mb-4 text-[10px] md:text-xs font-semibold bg-accent/10 text-accent border-accent/20 border hover:bg-accent/15 rounded-md px-2 py-0.5">
            Grade: {edu.grade}
          </Badge>
        )}

        {edu.description && (
          <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
            {edu.description}
          </p>
        )}

        {edu.achievements.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border/40">
            <span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-wider block">
              Key Focus & Accomplishments
            </span>
            <ul className="space-y-1.5">
              {edu.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="text-xs md:text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function EducationSection({ data }: { data: Education[] }) {
  // Sort oldest education first so path grows/animates from start to current
  const sortedData = [...data].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <section id="education" className="py-20 lg:py-28 relative overflow-hidden bg-muted/20">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper>
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              My Growth Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Education & Milestones
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Connecting the dots of my academic journey and personal growth, step by step.
            </p>
          </div>
        </MotionWrapper>

        {sortedData.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">
            No education history listed.
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            {sortedData.map((edu, index) => {
              const isEven = index % 2 === 0;
              const total = sortedData.length;
              const isLast = index === total - 1;

              return (
                <div key={edu._id}>
                  {/* Milestone Grid Row */}
                  <div className="grid grid-cols-1 md:grid-cols-9 items-center gap-4 md:gap-8">
                    {/* Left Column (Desktop) */}
                    <div className="order-2 md:order-1 col-span-1 md:col-span-4">
                      {!isEven ? (
                        <MotionWrapper direction="right" delay={0.15}>
                          <EducationCard edu={edu} />
                        </MotionWrapper>
                      ) : (
                        <div className="hidden md:block text-right pr-6">
                          <span className="text-xs font-bold text-accent tracking-wider uppercase">
                            Step {index + 1}
                          </span>
                          <h4 className="font-display font-bold text-foreground text-lg mt-1">
                            {formatDateShort(edu.startDate)}
                          </h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        </div>
                      )}
                    </div>

                    {/* Center Node Column */}
                    <div className="order-1 md:order-2 col-span-1 md:col-span-1 flex justify-start md:justify-center pl-2 md:pl-0">
                      <div className="flex md:block items-center gap-4 w-full md:w-auto">
                        <NodeIcon index={index} total={total} isCurrent={edu.isCurrent} />
                        
                        {/* Mobile Step Info */}
                        <div className="block md:hidden text-left">
                          <span className="text-[10px] font-bold text-accent tracking-wider uppercase">
                            Step {index + 1}
                          </span>
                          <h4 className="font-display font-semibold text-foreground text-sm">
                            {edu.institution}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDateShort(edu.startDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Desktop) */}
                    <div className="order-3 col-span-1 md:col-span-4">
                      {isEven ? (
                        <MotionWrapper direction="left" delay={0.15}>
                          <EducationCard edu={edu} />
                        </MotionWrapper>
                      ) : (
                        <div className="hidden md:block pl-6">
                          <span className="text-xs font-bold text-accent tracking-wider uppercase">
                            Step {index + 1}
                          </span>
                          <h4 className="font-display font-bold text-foreground text-lg mt-1">
                            {formatDateShort(edu.startDate)}
                          </h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connecting Winding SVG Path (except for last item) */}
                  {!isLast && (
                    <div className="grid grid-cols-1 md:grid-cols-9 items-center">
                      <div className="col-span-1 md:col-span-4 hidden md:block" />
                      <div className="col-span-1 md:col-span-1 flex justify-start md:justify-center">
                        <PathConnector index={index} />
                      </div>
                      <div className="col-span-1 md:col-span-4 hidden md:block" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
