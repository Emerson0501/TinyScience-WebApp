import { connectDB } from "@/utils/db";

import { CategoriaModel } from "@/domain/entities/categoria";

export async function GET() {
  try {
    await connectDB();
    const categorias = await CategoriaModel.find();
    return Response.json(categorias);
  } catch (error) {
    console.error("❌ Error al obtener las categorias:", error.message);
    return Response.json(
      { error: "Error al obtener las categorias" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const categoriaNueva = await CategoriaModel.create(body);
    return Response.json(categoriaNueva, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear la categoria:", error.message);
    return Response.json(
      { error: "Error al crear la categoria" },
      { status: 500 }
    );
  }
}
