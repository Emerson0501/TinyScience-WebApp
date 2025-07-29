import { NextResponse } from "next/server";
import { parseAuthCookie, verifyJwt } from "./src/utils/jwt";

export async function middleware(request) {
  // 1. Get the JWT from the Cookie
  const token = parseAuthCookie(request.headers.get("cookie"));

  const pathname = request.nextUrl.pathname;

  // 2. Define protected routes (example: all pages except the login page)
  const isProtectedRoute = pathname.startsWith("/admin");

  if (isProtectedRoute) {
    // 3. No token provided: Redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 4. Verify the JWT
    const payload = verifyJwt(token);
    if (!payload) {
      // The token is invalid or expired, clear the invalid Cookie (optional)
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }
  // ⚠️ Si es la ruta de login, y ya hay un token válido → redirigir a /admin
  if (pathname === "/login" && token && verifyToken(token)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Aplica a todas las páginas (excepto archivos estáticos o API)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
