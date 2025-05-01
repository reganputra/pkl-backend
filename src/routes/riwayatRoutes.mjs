import express from "express";
const router = express.Router();
import * as riwayatController from "../controllers/riwayatController.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

router.get("/", authMiddleware, riwayatController.getAllRiwayat);
router.get("/:year/:month", authMiddleware, riwayatController.getRiwayatByYearMonth);

export default router;
