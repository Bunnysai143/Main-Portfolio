"use client";

import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink, Globe, Twitter } from "lucide-react";
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
      // For now, just show success - you can integrate email API later
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
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Contact Me
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Have a project in mind or want to discuss opportunities? I&apos;d be glad to connect.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <MotionWrapper delay={0.1}>
            <div className="space-y-6">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-medium text-foreground hover:text-accent transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{contact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{contact.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {socialLinks.length > 0 && (
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-3">Connect with me</p>
                    <div className="flex gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                          title={link.label}
                        >
                          <link.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </MotionWrapper>

          {/* Contact Form */}
          <MotionWrapper delay={0.2}>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
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
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
