import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI no está definida en el archivo .env.local");
    throw new Error("Falta la variable de entorno MONGODB_URI");
  }

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Ya estás conectado a MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    throw error;
  }
}
