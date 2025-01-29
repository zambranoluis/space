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

    console.log("Middleware ejecutado para la ruta protegida:", pathname);
    console.log("Token detectado:", token);

    // Si no hay token, redirige al login
    if (!token) {
      console.log("No hay token de sesión, redirigiendo a login...");
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname); // Guarda la ruta de origen
      return NextResponse.redirect(loginUrl);
    }

    // Si hay token, permite el acceso
    console.log("Token válido, acceso permitido a la ruta:", pathname);
  }

  // Si es una ruta pública, permite el acceso
  if (isPublicRoute) {
    console.log("Ruta pública detectada:", pathname);
    return NextResponse.next();
  }

  // Para otras rutas no especificadas, permite el acceso por defecto
  console.log("Ruta no categorizada, acceso permitido por defecto:", pathname);
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
