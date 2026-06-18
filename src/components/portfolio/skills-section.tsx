"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { 
  Terminal, 
  Server, 
  Monitor, 
  Database, 
  Box, 
  Sparkles, 
  MoreHorizontal,
  Zap,
  CheckCircle2,
  Code2
} from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
}

// Category styling map (Icon, Color scheme)
const categoryMetaMap: Record<string, { icon: React.ComponentType<{ className?: string }>; colorClass: string; iconBg: string }> = {
  "Programming Languages": {
    icon: Code2,
    colorClass: "border-purple-500/20 hover:border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.02)]",
    iconBg: "bg-purple-500/10 text-purple-400"
  },
  "Backend Development": {
    icon: Server,
    colorClass: "border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.02)]",
    iconBg: "bg-blue-500/10 text-blue-400"
  },
  "Frontend Development": {
    icon: Monitor,
    colorClass: "border-sky-500/20 hover:border-sky-500/40 shadow-[0_0_15px_rgba(14,165,233,0.02)]",
    iconBg: "bg-sky-500/10 text-sky-400"
  },
  "Databases": {
    icon: Database,
    colorClass: "border-indigo-500/20 hover:border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.02)]",
    iconBg: "bg-indigo-500/10 text-indigo-400"
  },
  "Tools & Platforms": {
    icon: Box,
    colorClass: "border-orange-500/20 hover:border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.02)]",
    iconBg: "bg-orange-500/10 text-orange-400"
  },
  "Other": {
    icon: Sparkles,
    colorClass: "border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.02)]",
    iconBg: "bg-emerald-500/10 text-emerald-400"
  }
};

// Simplified SVG Logos for popular techs
function SkillLogo({ name }: { name: string }) {
  const norm = name.toLowerCase().trim();

  // JavaScript
  if (norm === "javascript" || norm === "js") {
    return (
      <svg className="w-5 h-5 rounded" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#F7DF1E" />
        <path d="M12 18h2v-2h-2v2zm5-6h-2v4h2v-4z" fill="#000" />
        <text x="13" y="19" fontFamily="Arial, Helvetica" fontSize="9" fontWeight="bold" fill="#000">JS</text>
      </svg>
    );
  }

  // TypeScript
  if (norm === "typescript" || norm === "ts") {
    return (
      <svg className="w-5 h-5 rounded" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="#3178C6" />
        <text x="12" y="18" fontFamily="Arial, Helvetica" fontSize="9" fontWeight="bold" fill="#FFF">TS</text>
      </svg>
    );
  }

  // React
  if (norm === "react" || norm === "react.js" || norm === "reactjs") {
    return (
      <svg className="w-5 h-5" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Node.js
  if (norm === "node.js" || norm === "node" || norm === "nodejs") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#339933" />
        <path d="M12 5.5l6 3.5v6l-6 3.5-6-3.5v-6l6-3.5z" fill="#FFF" opacity="0.3" />
        <circle cx="12" cy="12" r="3" fill="#FFF" />
      </svg>
    );
  }

  // Express
  if (norm === "express.js" || norm === "express" || norm === "expressjs") {
    return (
      <div className="w-5 h-5 bg-zinc-800 text-[10px] font-bold rounded flex items-center justify-center text-white border border-zinc-700">
        ex
      </div>
    );
  }

  // Python
  if (norm === "python") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M11.9 2c-2.7 0-2.5 1.2-2.5 1.2v1.5h2.6v.4H8.4S6 4.9 6 8.5c0 3.6 2.1 3.5 2.1 3.5h1.2v-1.7c0-2 1.6-3.7 3.7-3.7h2.6V4.1s.2-2.1-3.7-2.1zm.2 20c2.7 0 2.5-1.2 2.5-1.2v-1.5H12v-.4h3.6s2.4.2 2.4-3.4c0-3.6-2.1-3.5-2.1-3.5h-1.2v1.7c0 2-1.6 3.7-3.7 3.7H8.4v2.5s-.2 2.1 3.7 2.1z" fill="#3776AB" />
        <circle cx="9.5" cy="5.5" r="0.6" fill="#FFF" />
        <circle cx="14.5" cy="18.5" r="0.6" fill="#FFF" />
      </svg>
    );
  }

  // Java
  if (norm === "java") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M6 18c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5H6z" fill="#E61F24" />
        <path d="M8 3c0 2-2 3-2 5h6c0-2-2-3-2-5H8z" fill="#0073B7" />
        <path d="M12 10c0 3-4 4-4 7h8c0-3-4-4-4-7z" fill="#E61F24" />
      </svg>
    );
  }

  // HTML5
  if (norm === "html" || norm === "html5") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E34F26">
        <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 6H9.3l.2 2h7.7l-.6 6.4-4.5 1.2-4.5-1.2-.3-3.2h2l.1 1.7 2.7.7 2.7-.7.3-3.1H8.8l-.6-6.4h9.5l-.3 3.1z" />
      </svg>
    );
  }

  // CSS3
  if (norm === "css" || norm === "css3") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1572B6">
        <path d="M3 2l1.6 18 7.4 2 7.4-2L21 2H3zm14.4 6h-6.2l-.2-2h6.7l-.3 3H10.7l.2 2.2h5.7l-.5 5.5-4.1 1.1-4.1-1.1-.3-3.3h2l.1 1.8 2.3.6 2.3-.6.3-3.2H8.2L7.6 6h10.1l-.3 2z" />
      </svg>
    );
  }

  // Tailwind
  if (norm === "tailwind css" || norm === "tailwind" || norm === "tailwindcss") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M12 6.002C12 9.316 9.316 12 6.002 12c-3.316 0-6.002-2.684-6.002-5.998C0 2.688 2.686 0 6.002 0c3.316 0 5.998 2.688 5.998 6.002zm12 11.996C24 21.312 21.312 24 17.998 24c-3.316 0-6.002-2.688-6.002-6.002 0-3.316 2.686-5.998 6.002-5.998 3.316 0 5.998 2.682 5.998 5.998z" fill="#06B6D4" />
      </svg>
    );
  }

  // MongoDB
  if (norm === "mongodb" || norm === "mongo") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#47A248">
        <path d="M12 1.5C9.8 4 9.8 9 9.8 11.8c0 4.2 2.2 7.2 2.2 7.2s2.2-3 2.2-7.2c0-2.8 0-7.8-2.2-10.3z" />
        <path d="M12 18.5v4" stroke="#47A248" strokeWidth="2" />
      </svg>
    );
  }

  // MySQL
  if (norm === "mysql") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#4479A1">
        <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8z" opacity="0.2" />
        <path d="M12 5c-3.8 0-7 3.1-7 7s3.2 7 7 7c1.7 0 3.2-.6 4.4-1.6L12 13h6c0-4.4-3.6-8-8-8z" />
      </svg>
    );
  }

  // Git
  if (norm === "git") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#F05032">
        <path d="M23.2 11.2L12.8.8C12.3.3 11.5.3 11 .8L8.2 3.6 11 6.4c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.8 2.8c.6-.2 1.3-.1 1.8.4.6.6.6 1.5 0 2.1s-1.5.6-2.1 0c-.5-.5-.6-1.2-.4-1.8L12.7 9.3c-.2.2-.5.3-.7.3s-.5-.1-.7-.3c-.6-.6-.6-1.5 0-2.1l-2.8-2.8L1.6 11.2c-.5.5-.5 1.3 0 1.8l10.4 10.4c.5.5 1.3.5 1.8 0l10.4-10.4c.5-.5.5-1.3-.1-1.8z" />
      </svg>
    );
  }

  // Docker
  if (norm === "docker") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#2496ED">
        <path d="M3 10.5h3v2H3v-2zm4 0h3v2H7v-2zm4 0h3v2h-3v-2zm4 0h3v2h-3v-2zm-12 3h16v2H3v-2zm1 3h14v2H4v-2z" />
      </svg>
    );
  }

  // Postman
  if (norm === "postman") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6C37">
        <circle cx="12" cy="12" r="10" opacity="0.2" />
        <path d="M12 4l3 5H9l3-5zm0 16l-3-5h6l-3 5zm-8-8l5-3v6l-5-3zm16 0l-5 3v-6l5 3z" />
      </svg>
    );
  }

  // VS Code
  if (norm === "vs code" || norm === "vscode" || norm === "visual studio code") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#007ACC">
        <path d="M1.5 6.5L16 1.5v21l-14.5-5v-11z" opacity="0.2" />
        <path d="M22 6.5L16 1.5v21l6-5v-11z" />
      </svg>
    );
  }

  // Default Fallback
  return (
    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
      <CheckCircle2 className="w-3.5 h-3.5" />
    </div>
  );
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
    "Other",
    "Development Practices",
    "Soft Skills"
  ];

  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden bg-muted/10 dark:bg-black/40 text-left">
      {/* Sleek dotted/grid background */}
      <div className="absolute inset-0 bg-dots opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper>
          <div className="text-center mb-16 flex flex-col items-center">
            {/* Header Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 uppercase mb-4">
              • WHAT I KNOW •
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground dark:text-white mb-2">
              Skills & Technologies
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Technologies I work with to build scalable and impactful solutions.
            </p>
            <div className="w-16 h-1 bg-accent/40 rounded-full mt-4" />
          </div>
        </MotionWrapper>

        {/* 3-Column Skills Grid */}
        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sortedCategories.map((category) => {
            const meta = categoryMetaMap[category] || {
              icon: Terminal,
              colorClass: "border-border/50 hover:border-accent/30",
              iconBg: "bg-accent/10 text-accent"
            };
            const CategoryIcon = meta.icon;

            return (
              <MotionItem key={category}>
                <div className={`glass-card rounded-2xl p-6 h-full flex flex-col justify-between border transition-all duration-300 ${meta.colorClass}`}>
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${meta.iconBg}`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-bold text-foreground dark:text-white text-base">
                          {category}
                        </h3>
                      </div>
                      <MoreHorizontal className="w-5 h-5 text-muted-foreground/40 cursor-default" />
                    </div>

                    {/* Skill Items List */}
                    <div className="space-y-4">
                      {grouped[category].map((skill) => (
                        <div key={skill._id} className="group/item">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2.5">
                              <SkillLogo name={skill.name} />
                              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover/item:text-foreground dark:group-hover/item:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover/item:text-accent transition-colors">
                              {skill.proficiency}%
                            </span>
                          </div>
                          
                          {/* Sleek glowing progress bar */}
                          <div className="h-1.5 w-full bg-muted/80 dark:bg-zinc-800/60 rounded-full overflow-hidden border border-border/30 dark:border-zinc-700/20">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent to-blue-500 transition-all duration-700"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </MotionContainer>

        {/* Footer Info */}
        <MotionWrapper delay={0.4}>
          <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mt-16 pt-6 border-t border-border/20 max-w-md mx-auto">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              Always learning
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Always improving
            </span>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
