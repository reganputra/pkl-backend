import mongoose from "mongoose";

const riwayatSchema = new mongoose.Schema({
  kodeBarang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["barang masuk", "barang keluar"],
    required: true,
  },
  day: {
    type: String,
    default: () => new Date().toISOString().split("T")[0].split("-")[2],
  },
  month: {
    type: String,
    default: () => new Date().toISOString().split("T")[0].split("-")[1],
  },
  year: {
    type: String,
    default: () => new Date().toISOString().split("T")[0].split("-")[0],
  },
});

export default mongoose.model("Riwayat", riwayatSchema);
