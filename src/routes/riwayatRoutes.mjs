import express from "express";
const router = express.Router();
import * as riwayatController from "../controllers/riwayatController.mjs";

router.get("/", riwayatController.getAllRiwayat);
router.get("/:year/:month", riwayatController.getRiwayatByYearMonth);

export default router;
