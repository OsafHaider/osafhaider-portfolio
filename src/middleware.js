import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tokenVerification } from "./helper/jwt"; // Ensure this path is correct

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = cookies().get("AccessToken")?.value;

  let isVerified = null;
  if (token) {
    try {
      isVerified = await tokenVerification(token);
    } catch (error) {
      console.log(error.message);
    }
  }

  const role = isVerified?.role;

  // Define public routes and APIs
  const publicRoutes = ["/", "/signup", "/login"];
  const publicApiRoutes = ["/api/auth/user/login", "/api/user/signup"];

  // Handle unauthenticated users
  if (!isVerified) {
    if (publicRoutes.includes(pathname) || publicApiRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle authenticated users
  if (isVerified) {
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Restrict non-admin users from accessing admin routes
    if (role !== "admin" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|/api/user/signup|_next/static|_next/image|favicon.ico|/|/login/signup|public).*)',],
};
