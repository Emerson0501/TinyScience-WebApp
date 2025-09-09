const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export const CategoriaModel =
  mongoose.models.Categoria || mongoose.model("Categoria", CategoriaSchema);
