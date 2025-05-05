import mongoose from "mongoose";

const poSchema = new mongoose.Schema({
  nomorPO: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemKodeBarang: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  itemUkuranKemasan: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "sending", "delivered", "cancelled"],
    default: "pending",
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("PO", poSchema);
