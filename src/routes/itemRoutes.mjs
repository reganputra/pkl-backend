import express from "express";
import { upload, uploadToImageKit } from "../config/multer.mjs";
import * as itemController from "../controllers/itemController.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.post("/", upload.single("image"), authMiddleware, uploadToImageKit, itemController.createItem);
router.put("/:id", upload.single("image"), authMiddleware, uploadToImageKit, itemController.updateItem);
router.get("/", authMiddleware, itemController.getAllItems);
router.get("/:id", authMiddleware, itemController.getItemById);
router.delete("/:id", authMiddleware, itemController.deleteItem);
router.patch("/:id/update-quantity", authMiddleware, itemController.updateQuantity);

export default router;
