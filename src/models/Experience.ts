import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  position: string;
  type: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Freelance", "Remote", "Contract"],
      default: "Full-time",
    },
    location: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: "" },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
