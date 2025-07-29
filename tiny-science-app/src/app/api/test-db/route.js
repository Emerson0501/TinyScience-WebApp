import { connectDB } from "@/utils/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "✅ Conectado correctamente a MongoDB" });
  } catch (error) {
    return Response.json(
      { error: "❌ No se pudo conectar a MongoDB", details: error.message },
      { status: 500 }
    );
  }
}
