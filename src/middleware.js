import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { tokenVerification } from "./helper/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const headersList = headers();
  const auth = headersList.get("Authorization");
  const apiKey = process.env.API_KEY;

  // Secure API routes with auth token
  if (pathname.startsWith("/api/")) {
    if (auth !== apiKey) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }
  }

  // Verify token for frontend routes
  const token = cookies().get("AccessToken")?.value;
  const isVerified = token ? await tokenVerification(token) : false;
  const publicRoutes = ["/signup", "/login", "/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirect logic for public and protected routes
  if (!isVerified && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isVerified && isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};
