import { connectDB } from "@/utils/db";

import { PinModel } from "@/domain/entities/pin";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const pin = await PinModel.findById(params.id).populate("category");
    if (!pin)
      return Response.json({ error: "Pin no encontrado" }, { status: 404 });

    return Response.json(pin);
  } catch (error) {
    console.error("❌ Error al obtener el pin:", error.message);
    return Response.json({ error: "Error al obtener el pin" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const pinActualizado = await PinModel.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!pinActualizado)
      return Response.json({ error: "Pin no encontrado" }, { status: 404 });

    return Response.json(pinActualizado);
  } catch (error) {
    console.error("❌ Error al actualizar el pin:", error.message);
    return Response.json(
      { error: "Error al actualizar el pin" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const pinEliminado = await PinModel.findByIdAndDelete(params.id);
    if (!pinEliminado)
      return Response.json({ error: "Pin no encontrado" }, { status: 404 });
    return Response.json({ message: "Pin eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar el pin:", error.message);
    return Response.json(
      { error: "Error al eliminar el pin" },
      { status: 500 }
    );
  }
}
