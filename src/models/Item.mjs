import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kodeBarang: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ukuranKemasan: {
    type: Number,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

// Metode instance untuk mengonversi nama file gambar menjadi URI lengkap
itemSchema.methods.getImageUri = function () {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  return `${baseUrl}/uploads/${this.image}`;
};

export default mongoose.model("Item", itemSchema);
