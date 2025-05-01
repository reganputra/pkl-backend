import { Router } from "express";
import Item from "./itemRoutes.mjs";
import Riwayat from "./riwayatRoutes.mjs";
import User from "./userRoutes.mjs";
import PO from "./poRoutes.mjs";
import SuratJalan from "./suratJalanRoutes.mjs";
import { updatePOStatusToSending } from "../controllers/poController.mjs"; // Impor fungsi update status PO

const router = Router();

router.use("/items", Item);
router.use("/users", User);
router.use("/riwayat", Riwayat);
router.use("/po", PO);
router.use("/surat-jalan", SuratJalan);

// Scheduler untuk update status PO menjadi "sending" setiap 24 jam
setInterval(async () => {
  try {
    console.log("Running PO status update...");
    await updatePOStatusToSending(); // Panggil fungsi update status
  } catch (error) {
    console.error("Error updating PO status:", error.message);
  }
}, 24 * 60 * 60 * 1000); // Jalankan setiap 24 jam

export default router;
