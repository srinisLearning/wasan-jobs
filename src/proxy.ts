import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const route = request.nextUrl.pathname;
  const isPrivate =
    route.startsWith("/job-seeker") || route.startsWith("/recruiter");
  const token = request.cookies.get("token")?.value;

  // scenario 1: accessing private route without token
  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // scenario 2: accessing public route with token
  if (!isPrivate && token) {
    const role = request.cookies.get("role")?.value;
    const path = `/${role}/dashboard`;
    return NextResponse.redirect(new URL(path, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};