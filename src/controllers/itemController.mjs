import Item from "../models/Item.mjs";
import Riwayat from "../models/Riwayat.mjs";

// Fungsi untuk membuat item baru
const createItem = async (req, res) => {
  try {
    const { name, kodeBarang, quantity, category, ukuranKemasan } = req.body;
    const image = req.file ? req.file.url : "";

    const newItem = new Item({
      name,
      kodeBarang,
      quantity,
      category,
      image,
      ukuranKemasan,
    });
    await newItem.save();

    const riwayat = new Riwayat({
      quantity: quantity,
      name: newItem.name,
      kodeBarang: newItem.kodeBarang,
      category: newItem.category,
      image: newItem.image,
      ukuranKemasan: newItem.ukuranKemasan,
      status: "barang masuk",
    });
    await riwayat.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, kodeBarang, quantity, category, ukuranKemasan } = req.body;
    const item = await Item.findById(id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name || item.name;
    item.kodeBarang = kodeBarang || item.kodeBarang;
    item.quantity = quantity || item.quantity;
    item.category = category || item.category;
    item.ukuranKemasan = ukuranKemasan || item.ukuranKemasan;

    if (req.file) {
      item.image = req.file.url;
    }

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan semua item
const getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const items = await Item.find().skip(skip).limit(limit);

    const total = await Item.countDocuments();

    res.status(200).json({
      data: items,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mendapatkan item berdasarkan ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menghapus item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk memperbarui kuantitas barang
const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity < 0 && item.quantity < Math.abs(quantity)) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    item.quantity += quantity;
    await item.save();

    // Tentukan status berdasarkan nilai quantity
    const status = quantity > 0 ? "barang masuk" : "barang keluar";

    // Simpan riwayat perubahan
    const riwayat = new Riwayat({
      name: item.name,
      kodeBarang: item.kodeBarang,
      category: item.category,
      image: item.image,
      ukuranKemasan: item.ukuranKemasan,
      quantity: Math.abs(quantity),
      status,
    });
    await riwayat.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengupdate status PO menjadi "sending" berdasarkan nomorPO
const updatePOStatusToSending = async (req, res) => {
  try {
    const { nomorPO } = req.params; // Ambil nomorPO dari parameter URL

    // Cari PO berdasarkan nomorPO
    const po = await PO.findOne({ nomorPO });
    if (!po) return res.status(404).json({ message: "PO not found" });

    // Perbarui status PO menjadi "sending"
    po.status = "sending";
    await po.save();

    res.status(200).json({ message: `PO with nomorPO ${nomorPO} updated to 'sending'.`, po });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createItem, getAllItems, getItemById, updateItem, deleteItem, updateQuantity, updatePOStatusToSending };
