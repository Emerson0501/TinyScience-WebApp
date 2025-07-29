import jwt from 'jsonwebtoken';
import cookie from "cookie"; 

export function parseAuthCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookie.parse(cookieHeader);
  return cookies.authToken || null;
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("❌ Falló la verificación del JWT:", error.message);
    return null;
  }
}