import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public and ignored routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/events/:id'
]);

const isIgnoredRoute = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware(async (auth, request) => {
  if (isIgnoredRoute(request)) {
    // Skip auth for ignored routes
    return;
  }

  if (!isPublicRoute(request)) {
    // Require authentication for all non-public, non-ignored routes
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
