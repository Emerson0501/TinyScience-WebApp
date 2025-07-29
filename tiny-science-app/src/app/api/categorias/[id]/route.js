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

    const categoriaActualizada = await CategoriaModel.findByIdAndUpdate(
      params.id,
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
    const categoriaEliminada = await CategoriaModel.findByIdAndDelete(
      params.id
    );
    if (!categoriaEliminada)
      return Response.json(
        { error: "Categoria no encontrada" },
        { status: 404 }
      );
    return Response.json({ message: "Categoria eliminada con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar la categoria:", error.message);
    return Response.json(
      { error: "Error al eliminar la categoria" },
      { status: 500 }
    );
  }
}
