import { connectDB } from "@/utils/db";

import { PinModel } from "@/domain/entities/pin";

export async function GET() {
  try {
    await connectDB();
    const pines = await PinModel.find({ isActive: true }).populate("category");
    return Response.json(pines);
  } catch (error) {
    console.error("❌ Error al obtener los pines:", error.message);
    return Response.json(
      { error: "Error al obtener los pines" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const pinExistente = await PinModel.findOne({ name: body.name });

    if (pinExistente) {
      if (!pinExistente.isActive) {
        // Reactivar pin inactivo
        pinExistente.isActive = true;
        pinExistente.description = body.description || pinExistente.description;
        pinExistente.price = body.price || pinExistente.price;
        pinExistente.stock = body.stock || pinExistente.stock;
        pinExistente.image = body.image || pinExistente.image;
        pinExistente.category = body.category || pinExistente.category;

        await pinExistente.save();
        return Response.json(
          { message: "Pin reactivado y actualizado", pin: pinExistente },
          { status: 200 }
        );
      } else {
        return Response.json(
          { error: "El pin ya existe y está activo" },
          { status: 409 }
        );
      }
    }

    const pinNuevo = await PinModel.create(body);
    return Response.json(pinNuevo, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear el pin:", error.message);
    return Response.json({ error: "Error al crear el pin" }, { status: 500 });
  }
}
