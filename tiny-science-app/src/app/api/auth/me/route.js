export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { parseAuthCookie, verifyJwt } from "@/utils/jwt";
import { UserModel } from "@/domain/entities/usuario";

export async function GET(request) {
  try {
    await connectDB();
    const token = request.cookies.get("authToken")?.value || null;

    if (!token) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const payload = verifyJwt(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 401 }
      );
    }

    const user = await UserModel.findById(payload.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("❌ Error en /auth/me:", error.message);
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}
