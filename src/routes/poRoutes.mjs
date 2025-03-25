import express from "express";
const router = express.Router();
import { createAutoPO, getAllPOs, getPOById, updatePO, deletePO } from "../controllers/poController.mjs";

router.post("/", createAutoPO);
router.get("/", getAllPOs);
router.get("/:id", getPOById);
router.put("/:id", updatePO);
router.delete("/:id", deletePO);

export default router;
