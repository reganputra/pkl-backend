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
    // Generate nomor PO secara acak
    const nomorPO = generateNomorPO();

    // Ambil item secara acak dari database
    const item = await getRandomItem();
    if (!item) return res.status(404).json({ message: "No items found in the database" });

    // Generate kuantitas secara acak
    const quantity = Math.floor(Math.random() * 901) + 100; // Kuantitas acak antara 1 dan 100

    // Status default untuk PO baru
    const status = "pending";

    // Buat dokumen PO baru
    const newPO = new PO({
      nomorPO,
      itemName: item.name,
      itemKodeBarang: item.kodeBarang,
      itemCategory: item.category,
      itemImage: item.image,
      itemUkuranKemasan: item.ukuranKemasan,
      quantity,
      status,
    });

    // Simpan PO ke database
    await newPO.save();

    // Kembalikan respons dengan data PO yang baru dibuat
    res.status(201).json(newPO);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua PO
const getAllPOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const pos = await PO.find().skip(skip).limit(limit);

    const total = await PO.countDocuments();

    res.status(200).json({
      data: pos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
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
    const { nomorPO, itemName, itemKodeBarang, itemCategory, itemImage, itemUkuranKemasan, quantity, status } = req.body;

    const po = await PO.findById(id);
    if (!po) return res.status(404).json({ message: "PO not found" });

    if (nomorPO) po.nomorPO = nomorPO;
    if (itemName) po.itemName = itemName;
    if (itemKodeBarang) po.itemKodeBarang = itemKodeBarang;
    if (itemCategory) po.itemCategory = itemCategory;
    if (itemImage) po.itemImage = itemImage;
    if (itemUkuranKemasan) po.itemUkuranKemasan = itemUkuranKemasan;
    if (quantity) po.quantity = quantity;
    if (status) po.status = status;

    // Simpan perubahan ke database
    await po.save();

    // Kembalikan respons dengan data PO yang diperbarui
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

const updatePOStatusToSending = async (req, res) => {
  try {
    const { nomorPO } = req.params;
    console.log("nomorPO : ", nomorPO);
    // Cari PO berdasarkan nomorPO
    const po = await PO.findOne({ nomorPO });
    console.log("po : ", po);
    if (!po) {
      return res.status(404).json({ message: "PO not found" });
    }

    po.status = "sending";
    await po.save();

    res.status(200).json({ message: `PO with nomorPO ${nomorPO} updated to 'sending'.`, po });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO dengan status "pending"
const getPendingPOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const pos = await PO.find({ status: "pending" }).skip(skip).limit(limit);
    const total = await PO.countDocuments({ status: "pending" });
    res.status(200).json({
      data: pos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO dengan status "sending"
const getSendingPOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const pos = await PO.find({ status: "sending" }).skip(skip).limit(limit);
    const total = await PO.countDocuments({ status: "sending" });
    res.status(200).json({
      data: pos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan PO dengan status "delivered"
const getDeliveredPOs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const pos = await PO.find({ status: "delivered" }).skip(skip).limit(limit);
    const total = await PO.countDocuments({ status: "delivered" });
    res.status(200).json({
      data: pos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createAutoPO, getAllPOs, getPOById, updatePO, deletePO, updatePOStatusToSending, getPendingPOs, getSendingPOs, getDeliveredPOs };
