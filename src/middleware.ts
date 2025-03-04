import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and trying to access a protected route, redirect to login
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard/:path*"], // Adjust paths that need authentication
};
