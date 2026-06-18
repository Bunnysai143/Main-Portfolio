import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import AdminUser from "@/models/AdminUser";

export const dynamic = "force-dynamic";

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}

async function seed() {
  // Disable seeding in production to protect database
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not Found" },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const existingAdmin = await AdminUser.findOne({
      email: process.env.ADMIN_EMAIL?.toLowerCase(),
    });

    if (existingAdmin) {
      return NextResponse.json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Admin@123456",
      12
    );

    await AdminUser.create({
      name: "Sai Kiran",
      email: (process.env.ADMIN_EMAIL || "admin@saikiran.dev").toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed admin" },
      { status: 500 }
    );
  }
}
