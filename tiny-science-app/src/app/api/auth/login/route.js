import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { UserModel } from "@/domain/entities/usuario";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
export const runtime = "nodejs";

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Usuario no existe" }, { status: 401 });
  }
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 }
    );
  }

  const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 86400; // 24h = 86400 seg

  // Crear el JWT con payload mínimo necesario
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET, {expiresIn}
  );

  // Guardar token en cookie httpOnly
  const response = NextResponse.json({ message: "Login exitoso" });

  response.cookies.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // importante
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax para localhost
    path: "/",
    maxAge: expiresIn,
  });

  return response;
}
