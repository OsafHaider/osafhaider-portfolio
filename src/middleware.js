import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tokenVerification } from "./helper/jwt";

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
      console.log(error.message, "from middleware");
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
    if (pathname === "/login" || pathname === "/signup") {
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
    "/((?!api/auth|api/user/signup|_next/static|_next/image|favicon.ico|public/|signup|login|$).*)",
  ],
};
