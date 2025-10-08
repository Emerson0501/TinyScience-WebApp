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
    const { id } = await params;

    const body = await req.json();

    const pinActualizado = await PinModel.findByIdAndUpdate(id, body, {
      new: true,
    }).populate("category");

    if (!pinActualizado) {
      return Response.json({ error: "Pin no encontrado" }, { status: 404 });
    }

    return Response.json(
      { message: "Pin actualizado con éxito", pin: pinActualizado },
      { status: 200 }
    );
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

    const { id } = await params;

    const pinEliminado = await PinModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!pinEliminado) {
      return Response.json({ error: "Pin no encontrado" }, { status: 404 });
    }
    return Response.json(
      { message: "Pin desactivado con éxito", pin: pinEliminado },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error al desactivar el pin:", error.message);
    return Response.json(
      { error: "Error al desactivar el pin" },
      { status: 500 }
    );
  }
}
