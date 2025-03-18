import express from "express";
const router = express.Router();
import Riwayat from "../models/Riwayat.mjs";

// Rute untuk mendapatkan semua riwayat
router.get("/", async (req, res) => {
  try {
    const riwayat = await Riwayat.find().populate("kodeBarang");
    res.status(200).json(riwayat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk mendapatkan riwayat berdasarkan bulan dan tahun
router.get("/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const riwayat = await Riwayat.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate("kodeBarang", "kodeBarang name");

    res.status(200).json(riwayat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
