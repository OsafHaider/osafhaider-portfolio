import { NextResponse } from "next/server";
import { tokenVerification } from "./helper/jwt";
import { cookies } from "next/headers";

export async function middleware(req) {
  const token = cookies().get("AccessToken")?.value;
  const isVerified = await tokenVerification(token);
  const role = isVerified?.role;

  const publicRoutes = [
    "/login",
    "/signup",
    "/api/auth",
    "/",
    "/api/user/signup",
  ];

  const pathName = req.nextUrl.pathname;

  if (!token || !isVerified) {
    // If the path is a public route, allow access
    if (publicRoutes.includes(pathName)) {
      return NextResponse.next();
    }
    // Redirect to login if the route is protected and no valid token is found
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is verified and trying to access login or signup, redirect to home
  if (
    token &&
    isVerified &&
    (pathName === "/login" || pathName === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is verified but not an admin and trying to access an admin route, redirect to home
  if (token && isVerified && role !== "admin" && pathName === "/admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow access to other routes for verified users
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|/api/user/signup|_next/static|_next/image|favicon.ico|/login|/signup|/).*)",
  ],
};
