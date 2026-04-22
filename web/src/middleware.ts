import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isAuthDevBypass } from "@/lib/dev-auth-bypass";

export default auth((req) => {
  if (isAuthDevBypass()) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isLogin = pathname === "/login";
  const isApp = pathname.startsWith("/app");
  const isPortal = pathname.startsWith("/portal");

  if (isLogin && session?.user?.role) {
    const next = req.nextUrl.searchParams.get("next");
    if (session.user.role === "owner") {
      const target =
        next && next.startsWith("/portal") ? next : "/portal/painel";
      return Response.redirect(new URL(target, req.url));
    }
    const target = next && next.startsWith("/app") ? next : "/app/inicio";
    return Response.redirect(new URL(target, req.url));
  }

  if (isApp) {
    if (!session?.user) {
      const login = new URL("/login", req.url);
      login.searchParams.set("next", pathname);
      return Response.redirect(login);
    }
    if (session.user.role !== "staff") {
      return Response.redirect(new URL("/portal/painel", req.url));
    }
  }

  if (isPortal) {
    if (!session?.user) {
      const login = new URL("/login", req.url);
      login.searchParams.set("next", pathname);
      login.searchParams.set("context", "portal");
      return Response.redirect(login);
    }
    if (session.user.role !== "owner") {
      return Response.redirect(new URL("/app/inicio", req.url));
    }
  }

  return undefined;
});

export const config = {
  matcher: ["/login", "/app/:path*", "/portal/:path*"],
};
