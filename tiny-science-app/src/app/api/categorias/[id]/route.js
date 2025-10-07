import { connectDB } from "@/utils/db";

import { CategoriaModel } from "@/domain/entities/categoria";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const categoria = await CategoriaModel.findById(params.id);
    if (!categoria)
      return Response.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );

    return Response.json(categoria);
  } catch (error) {
    console.error("❌ Error al obtener la categoria:", error.message);
    return Response.json(
      { error: "Error al obtener la categoria" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;

    const categoriaActualizada = await CategoriaModel.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );
    if (!categoriaActualizada)
      return Response.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );

    return Response.json(categoriaActualizada);
  } catch (error) {
    console.error("❌ Error al actualizar la categoria:", error.message);
    return Response.json(
      { error: "Error al actualizar la categoria" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const categoriaEliminada = await CategoriaModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!categoriaEliminada)
      return Response.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );
    return Response.json({ message: "Categoria desactivada con éxito" });
  } catch (error) {
    console.error("❌ Error al desactivar la categoria:", error.message);
    return Response.json(
      { error: "Error al desactivar la categoria" },
      { status: 500 }
    );
  }
}
