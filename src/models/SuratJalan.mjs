import mongoose from "mongoose";

const suratjalanSchema = new mongoose.Schema({
  noSuratJalan: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("SuratJalan", suratjalanSchema);
