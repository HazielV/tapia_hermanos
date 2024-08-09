import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/actions/auth";

const protectedRoutes = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  /* console.log(request.url); */
  const path = request.nextUrl.pathname;

  const isProtectedRoute = path.startsWith("/dashboard");

  const session = await getSession();

  /*  console.log("ruta protegida", isProtectedRoute); */
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  /*   if (session && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  } */

  return NextResponse.next();
}

/* // See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}
 */
