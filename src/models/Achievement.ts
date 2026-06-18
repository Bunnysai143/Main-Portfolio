import mongoose, { Schema, Document } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  icon: string;
  date: Date;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "trophy" },
    date: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);
