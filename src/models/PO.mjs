import mongoose from "mongoose";

const poSchema = new mongoose.Schema({
  nomorPO: {
    type: String,
    required: true,
    unique: true,
  },
  barang: {
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
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("PO", poSchema);
