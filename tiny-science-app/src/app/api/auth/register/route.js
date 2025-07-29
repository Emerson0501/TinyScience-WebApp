import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { UserModel } from "@/domain/entities/usuario";

export async function POST(request) {
  try {
    await connectDB();

    const { name, lastName, username, email, password, role } =
      await request.json();

    const existing = await UserModel.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const newUser = new UserModel({
      name,
      lastName,
      username,
      email,
      password,
      role: role || "user",
    });

    await newUser.save();
    return NextResponse.json(
      { message: "Usuario creado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error en registro:", error.message);
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
