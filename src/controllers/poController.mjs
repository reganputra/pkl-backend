import PO from "../models/PO.mjs";
import Item from "../models/Item.mjs";

// Fungsi untuk menghasilkan nomor PO secara acak
const generateNomorPO = () => {
  return `PO-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Fungsi untuk memilih barang secara acak dari database
const getRandomItem = async () => {
  const items = await Item.find();
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

// Fungsi untuk membuat PO baru secara otomatis
const createAutoPO = async (req, res) => {
  try {
    const nomorPO = generateNomorPO();
    const item = await getRandomItem();
    const quantity = Math.floor(Math.random() * 100) + 1; // Kuantitas acak antara 1 dan 100
    const status = "pending";

    if (!item) return res.status(404).json({ message: "No items found in the database" });

    const newPO = new PO({ nomorPO, barang: item._id, quantity, status });
    await newPO.save();

    res.status(201).json(newPO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua PO
const getAllPOs = async (req, res) => {
  try {
    const pos = await PO.find().populate("barang");
    res.status(200).json(pos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO berdasarkan ID
const getPOById = async (req, res) => {
  try {
    const { id } = req.params;
    const po = await PO.findById(id).populate("barang");
    if (!po) return res.status(404).json({ message: "PO not found" });

    res.status(200).json(po);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui PO
const updatePO = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomorPO, barang, quantity, status } = req.body;

    const po = await PO.findById(id);
    if (!po) return res.status(404).json({ message: "PO not found" });

    if (nomorPO) po.nomorPO = nomorPO;
    if (barang) po.barang = barang;
    if (quantity) po.quantity = quantity;
    if (status) po.status = status;

    await po.save();

    res.status(200).json(po);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus PO
const deletePO = async (req, res) => {
  try {
    const { id } = req.params;
    const po = await PO.findByIdAndDelete(id);
    if (!po) return res.status(404).json({ message: "PO not found" });

    res.status(200).json({ message: "PO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengupdate status PO menjadi "sending" jika sudah H+1 dari waktu PO dibuat
const updatePOStatusToSending = async () => {
  try {
    const currentDate = new Date(); // Tanggal saat ini

    // Cari semua PO dengan status "pending"
    const pendingPOs = await PO.find({ status: "pending" });

    // Iterasi setiap PO untuk memeriksa apakah sudah H+1
    for (const po of pendingPOs) {
      const poDate = new Date(po.date); // Tanggal PO dibuat
      const diffInDays = Math.floor((currentDate - poDate) / (1000 * 60 * 60 * 24)); // Selisih hari

      if (diffInDays >= 1) {
        po.status = "sending"; // Update status menjadi "sending"
        await po.save(); // Simpan perubahan
      }
    }

    console.log("PO statuses updated to 'sending' where applicable.");
  } catch (error) {
    console.error("Error updating PO statuses:", error.message);
  }
};

// Fungsi untuk mendapatkan PO dengan status "pending"
const getPendingPOs = async (req, res) => {
  try {
    const pos = await PO.find({ status: "pending" }).populate("barang");
    res.status(200).json(pos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO dengan status "sending"
const getSendingPOs = async (req, res) => {
  try {
    const pos = await PO.find({ status: "sending" }).populate("barang");
    res.status(200).json(pos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO dengan status "delivered"
const getDeliveredPOs = async (req, res) => {
  try {
    const pos = await PO.find({ status: "delivered" }).populate("barang");
    res.status(200).json(pos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createAutoPO, getAllPOs, getPOById, updatePO, deletePO, updatePOStatusToSending, getPendingPOs, getSendingPOs, getDeliveredPOs };
