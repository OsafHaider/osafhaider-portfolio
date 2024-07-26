import { NextResponse } from "next/server";
import { tokenVerification } from "./helper/jwt";
import { cookies } from "next/headers";

export async function middleware(req) {
  // Get the access token from the cookies
  const token = cookies().get("AccessToken")?.value;

  // Verify the token
  const isVerified = token ? await tokenVerification(token) : null;
  const role = isVerified?.role;

  // Define public routes and static asset paths
  const publicRoutes = [
    "/login",
    "/signup",
    "/api/auth",
    "/",
    "/api/user/signup",
  ];

  // Get the current request path
  const pathName = req.nextUrl.pathname;

  // Handle unauthenticated access
  if (!token || !isVerified) {
    if (publicRoutes.includes(pathName) || pathName.startsWith("/assets/")) {
      // Allow access to public routes and static assets
      return NextResponse.next();
    }
    // Redirect to login for protected routes
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Handle authenticated users
  if (pathName === "/login" || pathName === "/signup") {
    // Redirect authenticated users away from login/signup pages
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (role !== "admin" && pathName === "/admin") {
    // Redirect non-admin users trying to access admin routes
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except the specified ones
    "/((?!api/auth|/api/user/signup|_next/static|_next/image|favicon.ico|/|/login|/signup|/public/).*)",
  ],
};
