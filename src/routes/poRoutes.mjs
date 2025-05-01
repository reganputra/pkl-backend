import express from "express";
const router = express.Router();
import { createAutoPO, getAllPOs, getPOById, updatePO, deletePO, getPendingPOs, getSendingPOs, getDeliveredPOs, updatePOStatusToSending } from "../controllers/poController.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

router.post("/", authMiddleware, createAutoPO);
router.get("/", authMiddleware, getAllPOs);
router.get("/:id", authMiddleware, getPOById);
router.put("/:id", authMiddleware, updatePO);
router.delete("/:id", authMiddleware, deletePO);
router.get("/status/pending", authMiddleware, getPendingPOs);
router.get("/status/sending", authMiddleware, getSendingPOs);
router.get("/status/delivered", authMiddleware, getDeliveredPOs);

export default router;
