import mongoose, { Schema, Document } from "mongoose";

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  grade: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    grade: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: "" },
    achievements: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema);
