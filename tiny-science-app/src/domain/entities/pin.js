import mongoose from "mongoose";
import { CategoriaModel } from "./categoria"; // 👈 importa el modelo de categorías

const PinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export const PinModel = mongoose.models.Pin || mongoose.model("Pin", PinSchema);
