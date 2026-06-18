import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageId: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  technologiesUsed: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    imageId: { type: String, default: "" },
    yearsOfExperience: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    technologiesUsed: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.About ||
  mongoose.model<IAbout>("About", AboutSchema);
