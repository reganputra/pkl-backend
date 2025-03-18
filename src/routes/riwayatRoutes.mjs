import express from "express";
const router = express.Router();
import Riwayat from "../models/Riwayat.mjs";

// Rute untuk mendapatkan semua riwayat perubahan
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

    const rawData = await Riwayat.find({ month, year }).populate(
      "kodeBarang",
      "kodeBarang name"
    );

    const groupedData = rawData.reduce((acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    }, {});

    const result = Object.entries(groupedData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([day, records]) => ({ day, records }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
