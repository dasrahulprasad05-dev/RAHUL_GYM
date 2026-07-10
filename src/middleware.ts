import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;
  const isAdmin = path.startsWith("/admin");
  const isMember = path.startsWith("/member");
  const isAuth = path.startsWith("/login") || path.startsWith("/register");

  // Redirect logged-in users away from auth pages
  if (isAuth && isLoggedIn) {
    const role = req.auth?.user?.role;
    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/admin" : "/member", req.url)
    );
  }

  // Protect dashboard routes
  if ((isAdmin || isMember) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin-only routes
  if (isAdmin && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/member", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
