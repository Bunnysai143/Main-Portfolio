import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  resumeUrl: string;
  profileImage: string;
  profileImageId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    greeting: { type: String, default: "Hello, I'm" },
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    ctaText: { type: String, default: "View My Work" },
    ctaLink: { type: String, default: "#projects" },
    resumeUrl: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    profileImageId: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hero ||
  mongoose.model<IHero>("Hero", HeroSchema);
