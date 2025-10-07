import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

function isProtected(pathname) {
  return pathname.startsWith("/admin");
}

async function verifyJwt(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload; 
  } catch (error) {
    console.error("Falló la verificación del JWT:", error.message);
    return null;
  }
}

export async function middleware(request) {

  const token = request.cookies.get("authToken")?.value || null;
  const pathname = request.nextUrl.pathname;

  if (isProtected(pathname)) {
    if (!token || token.trim() === "") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyJwt(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  if (pathname === "/login" && token) {
    const payload = await verifyJwt(token);
    if (payload) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"], 
};
