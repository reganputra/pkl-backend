import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.mjs";
import itemRoutes from "./src/routes/itemRoutes.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import riwayatRoutes from "./src/routes/riwayatRoutes.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir);
    console.log(`Created uploads directory at ${uploadsDir}`);
  } catch (err) {
    console.error(`Error creating uploads directory: ${err.message}`);
  }
} else {
  console.log(`Uploads directory already exists at ${uploadsDir}`);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riwayat", riwayatRoutes);

// Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
