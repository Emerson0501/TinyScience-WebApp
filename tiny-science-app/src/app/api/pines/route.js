import { connectDB } from "@/utils/db";

import { PinModel } from "@/domain/entities/pin";

export async function GET() {
  try {
    await connectDB();
    const pines = await PinModel.find().populate("category");
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

    const pinNuevo = await PinModel.create(body);
    return Response.json(pinNuevo, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear el pin:", error.message);
    return Response.json({ error: "Error al crear el pin" }, { status: 500 });
  }
}
