"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, Globe, Twitter, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormInput } from "@/schemas";
import { toast } from "sonner";
import { useState } from "react";

interface ContactData {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  twitter?: string;
  website?: string;
  resumeUrl?: string;
}

export function ContactSection({ data }: { data: ContactData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contact = {
    email: data?.email || "saikiranmain1708@gmail.com",
    phone: data?.phone || "+91 9014764318",
    location: data?.location || "Kakinada, India",
    linkedin: data?.linkedin || "",
    github: data?.github || "",
    leetcode: data?.leetcode || "",
    twitter: data?.twitter || "",
    website: data?.website || "",
    resumeUrl: data?.resumeUrl || "",
  };

  const socialLinks = [
    { href: contact.github, icon: Github, label: "GitHub" },
    { href: contact.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: contact.leetcode, icon: ExternalLink, label: "LeetCode" },
    { href: contact.twitter, icon: Twitter, label: "Twitter" },
    { href: contact.website, icon: Globe, label: "Website" },
  ].filter((link) => link.href);

  const contactInfo = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: null },
    { icon: MapPin, label: "Location", value: contact.location, href: null },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (formData: ContactFormInput) => {
    setIsSubmitting(true);
    try {
      console.log("Contact form:", formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wider uppercase mb-2">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
              Contact Me
            </h2>
            <div className="section-gradient-line w-24 mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Have a project in mind or want to discuss opportunities? I&apos;d be glad to connect.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <MotionWrapper delay={0.1}>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="glass-card card-glow rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {socialLinks.length > 0 && (
                <div className="glass-card card-glow rounded-xl p-5">
                  <p className="text-sm text-muted-foreground mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 hover:scale-110 transition-all duration-300"
                        title={link.label}
                      >
                        <link.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </MotionWrapper>

          {/* Contact Form */}
          <MotionWrapper delay={0.2}>
            <div className="glass-card rounded-xl p-6 border border-accent/20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient w-full rounded-lg px-6 py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
