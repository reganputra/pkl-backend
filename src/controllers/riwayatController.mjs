import Riwayat from "../models/Riwayat.mjs";

const getAllRiwayat = async (req, res) => {
  try {
    const riwayat = await Riwayat.find();
    res.status(200).json(riwayat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRiwayatByYearMonth = async (req, res) => {
  try {
    let { year, month } = req.params;

    // Pastikan year dan month dalam bentuk string
    year = String(year);
    month = String(month).padStart(2, "0");

    const riwayat = await Riwayat.find({ year, month });

    res.status(200).json(riwayat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllRiwayat, getRiwayatByYearMonth };
