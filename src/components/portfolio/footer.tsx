import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

interface ContactData {
  email?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
}

export function Footer({ contact }: { contact?: ContactData }) {
  const currentYear = new Date().getFullYear();
  const email = contact?.email || "saikiranmain1708@gmail.com";
  const github = contact?.github || "";
  const linkedin = contact?.linkedin || "";
  const leetcode = contact?.leetcode || "";

  return (
    <footer className="border-t bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Sai Kiran<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Backend-focused software developer building reliable, scalable
              systems and intelligent applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {["About", "Projects", "Experience", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              {leetcode && (
                <a
                  href={leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Kudupudi Sai Kiran. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, TypeScript & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
