import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function authenticateRequest(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith("admin-token="))
    ?.split("=")[1];

  if (!token) return null;
  return verifyToken(token);
}

export async function getRequestBody<T>(request: Request): Promise<T> {
  return request.json() as Promise<T>;
}
