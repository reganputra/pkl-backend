import Surat from "../models/SuratJalan.mjs";
import PO from "../models/PO.mjs";

// Fungsi untuk membuat surat jalan baru
const createSuratJalan = async (req, res) => {
  try {
    const { noSuratJalan } = req.body;
    // Periksa apakah nomor surat jalan sudah ada
    const existingSuratJalan = await Surat.findOne({ noSuratJalan });
    if (existingSuratJalan) {
      return res.status(400).json({ message: "Nomor surat jalan sudah ada" });
    }

    // Cari nomor PO yang sesuai di model PO
    const po = await PO.findOne({ nomorPO: noSuratJalan });
    if (!po) return res.status(404).json({ message: "PO not found" });

    // Periksa apakah PO sudah delivered
    if (po.status === "delivered") {
      return res.status(400).json({ message: "PO sudah delivered" });
    }

    // Buat surat jalan baru
    const newSuratJalan = new Surat({ noSuratJalan });
    await newSuratJalan.save();

    // Perbarui status PO menjadi delivered
    po.status = "delivered";
    await po.save();

    res.status(201).json(newSuratJalan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua surat jalan
const getAllSuratJalan = async (req, res) => {
  try {
    const suratJalans = await Surat.find();
    res.status(200).json(suratJalans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan surat jalan berdasarkan ID
const getSuratJalanById = async (req, res) => {
  try {
    const { id } = req.params;
    const suratJalan = await Surat.findById(id); // Gunakan 'Surat' sebagai model
    if (!suratJalan) return res.status(404).json({ message: "Surat Jalan not found" });

    res.status(200).json(suratJalan);
  } catch (error) {
    console.error(error); // Tambahkan logging
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus surat jalan
const deleteSuratJalan = async (req, res) => {
  try {
    const { id } = req.params;
    const suratJalan = await Surat.findByIdAndDelete(id); // Gunakan 'Surat' sebagai model
    if (!suratJalan) return res.status(404).json({ message: "Surat Jalan not found" });

    res.status(200).json({ message: "Surat Jalan deleted successfully" });
  } catch (error) {
    console.error(error); // Tambahkan logging
    res.status(500).json({ message: error.message });
  }
};

export { createSuratJalan, getAllSuratJalan, getSuratJalanById, deleteSuratJalan };
