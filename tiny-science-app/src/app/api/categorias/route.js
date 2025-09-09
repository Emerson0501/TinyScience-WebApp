import { connectDB } from "@/utils/db";

import { CategoriaModel } from "@/domain/entities/categoria";

export async function GET() {
  try {
    await connectDB();
    const categorias = await CategoriaModel.find({ isActive: true });
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

    const categoriaExistente = await CategoriaModel.findOne({
      name: body.name,
    });

    if (categoriaExistente) {
      if (!categoriaExistente.isActive) {
        // Reactivar categoria inactiva
        categoriaExistente.isActive = true;
        categoriaExistente.description =
          body.description || categoriaExistente.description;
        categoriaExistente.image = body.image || categoriaExistente.image;
        await categoriaExistente.save();

        return Response.json(categoriaExistente, { status: 200 });
      } else {
        z;
        console.log("Ya existe");
        return Response.json(
          { error: "La categoría ya existe" },
          { status: 409 }
        );
      }
    }

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
