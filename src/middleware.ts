import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secretPath = process.env.ADMIN_SECRET_PATH || "secret-admin-gate";

  // 1. Handle secret gate access
  if (pathname === `/${secretPath}`) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.set("admin-gate-token", "allowed", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300, // 5 minutes (enough time to login)
      path: "/",
    });
    return response;
  }

  // 2. Protect and obscure admin paths
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-token")?.value;
    const gateToken = request.cookies.get("admin-gate-token")?.value;

    // A. If authenticated, allow access (but redirect logged-in users away from login page)
    if (token) {
      if (pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // B. If not authenticated:
    // Only allow access to the login page if they have the gate token
    if (pathname === "/admin/login") {
      if (gateToken === "allowed") {
        return NextResponse.next();
      }
      // Obscure the login page behind a 404 Not Found
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    // If they have the gate token but try to access a subpage, redirect to login
    if (gateToken === "allowed") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Default: completely obscure route with a 404 response
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // Security headers for standard routes
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
