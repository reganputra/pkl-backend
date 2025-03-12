import express from "express";
const router = express.Router();
import upload from "../config/multer.mjs";
import { createItem, getAllItems, getItemById, updateItem, deleteItem, addQuantity, subtractQuantity } from "../controllers/itemController.mjs";

router.post("/", upload.single("image"), createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);
router.patch("/:id/add-quantity", addQuantity);
router.patch("/:id/subtract-quantity", subtractQuantity);

export default router;
