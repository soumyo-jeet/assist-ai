import { clerkMiddleware } from "@clerk/nextjs/server";

export function activityLogger(req) {
  const url = req.nextUrl.pathname;
  const method = req.method;
  const timestamp = new Date().toISOString();
  console.log(`[User Activity] ${method} ${url} at ${timestamp}`);
}

export default function middleware(req) {
  activityLogger(req); // Log the request
  return clerkMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api(.*)',
  ],
 })(req);
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run on homepage
    '/(api|trpc)(.*)', // Run on API routes
    '/((?!api/inngest|_next/static|_next/image|favicon.ico).*)'
  ],
};
