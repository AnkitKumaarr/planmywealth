import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  // Paths that require authentication
  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/settings",
    "/generatereport",
  ];
  console.log("Ankite-->", request.nextUrl.pathname);
  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const { payload } = await jwtVerify(token.value, secret);
      // Check for roles in the payload
      const userRole = payload.role;
      const allowedRoles = ["admin", "manager", "user"];

      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/generatereport/:path*",
  ],
};
