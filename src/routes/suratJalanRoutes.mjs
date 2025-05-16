import express from "express";
const router = express.Router();
import * as suratJalanController from "../controllers/suratJalanController.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

router.get("/", authMiddleware, suratJalanController.getAllSuratJalan);
router.get("/:id", authMiddleware, suratJalanController.getSuratJalanById);
router.post("/", authMiddleware, suratJalanController.createSuratJalan);
//router.delete("/:id", authMiddleware, suratJalanController.deleteSuratJalan);

export default router;
