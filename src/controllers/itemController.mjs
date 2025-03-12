import Item from "../models/Item.mjs";
import fs from "fs";
import path from "path";

// Create Item
const createItem = async (req, res) => {
  try {
    const { name, kodeBarang, quantity, category, ukuranKemasan } = req.body;
    const image = req.file ? req.file.filename : "";

    const newItem = new Item({ name, kodeBarang, quantity, category, image, ukuranKemasan });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { name, kodeBarang, quantity, category, ukuranKemasan } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name || item.name;
    item.kodeBarang = kodeBarang || item.kodeBarang;
    item.quantity = quantity || item.quantity;
    item.category = category || item.category;
    item.ukuranKemasan = ukuranKemasan || item.ukuranKemasan;

    if (req.file) {
      item.image = req.file.filename;
    }

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Hapus gambar terkait
    if (item.imageUrl) fs.unlinkSync(item.imageUrl);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk menambahkan kuantitas barang
const addQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += quantity;
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fungsi untuk mengurangi kuantitas barang
const subtractQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient quantity" });
    }

    item.quantity -= quantity;
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createItem, getAllItems, getItemById, updateItem, deleteItem, addQuantity, subtractQuantity };
