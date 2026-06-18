import mongoose, { Schema, Document } from "mongoose";

export interface INotificationLog extends Document {
  action: string;
  entity: string;
  entityId: string;
  message: string;
  adminId: string;
  adminEmail: string;
  metadata: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationLogSchema = new Schema<INotificationLog>(
  {
    action: {
      type: String,
      required: true,
      enum: ["create", "update", "delete", "login", "logout", "upload"],
    },
    entity: {
      type: String,
      required: true,
      enum: [
        "hero",
        "about",
        "skill",
        "experience",
        "project",
        "achievement",
        "education",
        "contact",
        "admin",
        "system",
      ],
    },
    entityId: { type: String, default: "" },
    message: { type: String, required: true },
    adminId: { type: String, required: true },
    adminEmail: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationLogSchema.index({ createdAt: -1 });
NotificationLogSchema.index({ isRead: 1 });

export default mongoose.models.NotificationLog ||
  mongoose.model<INotificationLog>("NotificationLog", NotificationLogSchema);
