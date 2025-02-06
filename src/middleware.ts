import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = ["/login", "/faqs", "/create-account", "/shopping-cart"];

  // Rutas protegidas que requieren autenticación
  const protectedPaths = ["/panel-client", "/cancel", "/success", "/questionnaire"];

  // Comprueba si la ruta actual es pública
  const isPublicRoute = publicPaths.some((path) => pathname.startsWith(path));

  // Comprueba si la ruta actual es protegida
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedRoute) {
    const tokenCookie = req.cookies.get("next-auth.session-token");
    const token = tokenCookie?.value;

    // Si no hay token, redirige al login
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname); // Guarda la ruta de origen
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si es una ruta pública, permite el acceso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/panel-client/:path*",
    "/cancel/:path*",
    "/success/:path*",
    "/questionnaire/:path*",
    "/login",
    "/faqs",
    "/create-account",
    "/shopping-cart",
  ],
};
