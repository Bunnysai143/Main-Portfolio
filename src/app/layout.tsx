import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sai Kiran | Backend Developer & AI Engineer",
    template: "%s | Sai Kiran",
  },
  description:
    "Backend-focused software developer and AI-oriented engineer. Specialized in building scalable APIs, distributed systems, and intelligent applications.",
  keywords: [
    "Sai Kiran",
    "Backend Developer",
    "Software Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Node.js",
    "Python",
    "Java",
    "MongoDB",
    "REST APIs",
  ],
  authors: [{ name: "Kudupudi Sai Kiran" }],
  creator: "Kudupudi Sai Kiran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Sai Kiran | Backend Developer & AI Engineer",
    description:
      "Backend-focused software developer and AI-oriented engineer building scalable systems.",
    siteName: "Sai Kiran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Kiran | Backend Developer & AI Engineer",
    description:
      "Backend-focused software developer building scalable APIs and intelligent applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                color: "hsl(var(--card-foreground))",
                border: "1px solid hsl(var(--border))",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
