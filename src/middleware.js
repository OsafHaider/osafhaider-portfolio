import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tokenVerification } from "./helper/jwt"; // Ensure this function properly verifies your JWT

export async function middleware(request) {
  const publicRoutes = ["/", "/signup", "/login"];
  const publicApiRoutes = ["/api/auth/user/login", "/api/user/signup"];
  const { pathname } = request.nextUrl;
  const token = cookies().get("AccessToken")?.value;

  let isVerified = null;
  if (token) {
    try {
      isVerified = await tokenVerification(token);
    } catch (error) {
      console.error("Token verification error:", error.message);
    }
  }

  if (!token || !isVerified) {
    if (
      !publicRoutes.includes(pathname) &&
      !publicApiRoutes.some((apiRoute) => pathname.startsWith(apiRoute))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/admin" && isVerified.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|api/user/signup|_next/static|_next/image|favicon.ico|public|signup|login|$).*)",
  ],
};
