"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
}

export function ProjectsSection({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Production applications and systems I&apos;ve architected and built.
            </p>
          </div>
        </MotionWrapper>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((project) => (
            <MotionItem key={project._id}>
              <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {project.image && (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </MotionItem>
          ))}
        </MotionContainer>
      </div>
    </section>
  );
}
