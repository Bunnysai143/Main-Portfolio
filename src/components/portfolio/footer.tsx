"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from "lucide-react";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = ["About", "Projects", "Experience", "Contact"];

  const socialLinks = [
    { href: github, icon: Github, label: "GitHub" },
    { href: linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: `mailto:${email}`, icon: Mail, label: "Email" },
    { href: leetcode, icon: ExternalLink, label: "LeetCode" },
  ].filter((link) => link.href);

  return (
    <footer className="bg-card/30 relative">
      {/* Top accent line */}
      <div className="section-gradient-line" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-display font-bold tracking-tight">
              Sai Kiran<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Backend-focused software developer building reliable, scalable
              systems and intelligent applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((item) => (
                <div key={item} className="group relative inline-block">
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
                  >
                    {item}
                  </Link>
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 bg-accent" />
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                  className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 hover:scale-110 transition-all duration-300"
                  title={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-gradient-line opacity-30" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Kudupudi Sai Kiran. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript & MongoDB
            </p>
            <button
              onClick={scrollToTop}
              className="glass-card rounded-full p-2 hover:scale-110 transition-all duration-300 hover:text-accent text-muted-foreground"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
