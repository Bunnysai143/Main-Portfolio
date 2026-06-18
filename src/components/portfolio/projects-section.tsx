"use client";

import { MotionWrapper, MotionContainer, MotionItem } from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

const DESC_CHAR_LIMIT = 120;

export function ProjectsSection({ data }: { data: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Featured Projects
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Production applications and systems I&apos;ve architected and built.
            </p>
          </div>
        </MotionWrapper>

        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((project) => {
            const isLongDesc = project.description.length > DESC_CHAR_LIMIT;
            const truncatedDesc = isLongDesc
              ? project.description.slice(0, DESC_CHAR_LIMIT).trimEnd() + "..."
              : project.description;

            return (
              <MotionItem key={project._id}>
                <div
                  className={`group h-full flex flex-col overflow-hidden rounded-xl glass-card card-glow ${
                    project.featured ? "border border-accent/30" : ""
                  }`}
                >
                  {/* Image */}
                  {project.image && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          View Project
                        </span>
                      </div>
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Truncated description */}
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {truncatedDesc}
                      </p>
                      {isLongDesc && (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-sm text-accent hover:text-accent/80 font-medium mt-1 transition-colors"
                        >
                          Read More →
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs hover:scale-105 transition-transform cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto pt-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gradient rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="hover:border-accent/50 transition-colors">
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
                    </div>
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </MotionContainer>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-2xl glass-card border-accent/20 max-h-[85vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <DialogTitle className="text-xl font-display">
                      {selectedProject.title}
                    </DialogTitle>
                    {selectedProject.featured && (
                      <span className="inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <Star className="h-2.5 w-2.5 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {selectedProject.category}
                  </Badge>
                </div>
                <DialogDescription className="sr-only">
                  Details about {selectedProject.title}
                </DialogDescription>
              </DialogHeader>

              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative h-56 sm:h-64 rounded-lg overflow-hidden bg-muted mt-2">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>
              )}

              {/* Full Description */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">About this project</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient rounded-lg px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <Button variant="outline" asChild className="hover:border-accent/50">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
