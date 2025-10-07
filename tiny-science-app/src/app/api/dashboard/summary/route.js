import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { PinModel } from "@/domain/entities/pin";
import { CategoriaModel } from "@/domain/entities/categoria";

export async function GET() {
  try {
    await connectDB();

    const [pinesActivos, categoriasActivas] = await Promise.all([
      PinModel.countDocuments({ isActive: true }),
      CategoriaModel.countDocuments({ isActive: true }),
    ]);

    return NextResponse.json({
      pinesActivos,
      categoriasActivas,
    });
  } catch (error) {
    console.error("Error al obtener resumen del dashboard:", error);
    return NextResponse.json(
      { error: "Error al obtener los totales" },
      { status: 500 }
    );
  }
}
