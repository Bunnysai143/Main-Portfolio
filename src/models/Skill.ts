import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Programming Languages",
        "Backend Development",
        "Frontend Development",
        "Databases",
        "Tools & Platforms",
        "Development Practices",
        "Soft Skills",
        "Other",
      ],
    },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);
