import mongoose from "mongoose";

const riwayatSchema = new mongoose.Schema({
  kodeBarang: {
    type: mongoose.Schema.Types.String,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

riwayatSchema.pre("save", function (next) {
  const date = new Date(this.date);
  date.setHours(0, 0, 0, 0);
  this.date = date;
  next();
});

export default mongoose.model("Riwayat", riwayatSchema);
