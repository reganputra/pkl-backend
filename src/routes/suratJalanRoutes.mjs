import express from "express";
const router = express.Router();
import * as suratJalanController from "../controllers/suratJalanController.mjs";

router.get("/", suratJalanController.getAllSuratJalan);
router.get("/:id", suratJalanController.getSuratJalanById);
router.post("/", suratJalanController.createSuratJalan);
router.delete("/:id", suratJalanController.deleteSuratJalan);

export default router;
