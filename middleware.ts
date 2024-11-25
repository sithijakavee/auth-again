import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { AuthAPIPrefix, authRoutes } from "./routes";
import axios, { AxiosError } from "axios";
import { verifySID } from "./lib/token";
import auth from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const sidCookie = cookieStore.get("sid");
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathname);
  const isApiAuthRoute = pathname.startsWith(AuthAPIPrefix);
  let isAuthenticated = true;

  if (isAuthenticated && isAuthRoute)
    return Response.redirect(new URL("/", req.nextUrl.origin));

  if (!isAuthenticated && !isAuthRoute && !isApiAuthRoute)
    return Response.redirect(new URL("/sign-in", req.nextUrl.origin));
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
