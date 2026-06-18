import mongoose, { Schema, Document } from "mongoose";

export interface IContactInfo extends Document {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  leetcode: string;
  twitter: string;
  website: string;
  resumeUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    leetcode: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo ||
  mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);
