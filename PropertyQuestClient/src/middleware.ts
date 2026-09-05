import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

// Define which routes are public and which require authentication
// const publicRoutes = [
//   "/",
//   "/buy",
//   "/rent",
//   "/agents",
//   "/agencies",
//   "/projects",
//   "/insights",
// ];
const authRoutes = ["/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is for static files or API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") // Static files like images, etc.
  ) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  // Verify the token and get the user information
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.error("Token verification failed:", err);
      return null;
    }));

  // Check if the user is authenticated
  const isAuthenticated = !!verifiedToken;

  // Handle client area routes (protected routes)
  if (pathname.startsWith("/dashboard")) {
    // If not authenticated, redirect to signin
    if (!isAuthenticated) {
      const url = new URL("/", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // User is authenticated, allow access to dashboard area
    return NextResponse.next();
  }

  // Handle auth routes (signin, signup, etc.)
  if (
    authRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // For all other routes, just proceed
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /api (API routes)
     * 3. /static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. All files in the public folder
     */
    "/((?!_next|api|static|_vercel|.*\\..*|favicon.ico).*)",
  ],
};
