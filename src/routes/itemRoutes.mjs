import express from "express";
import { upload, uploadToImageKit } from "../config/multer.mjs";
import * as itemController from "../controllers/itemController.mjs";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  uploadToImageKit,
  itemController.createItem
);
router.put(
  "/:id",
  upload.single("image"),
  uploadToImageKit,
  itemController.updateItem
);
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.delete("/:id", itemController.deleteItem);
router.patch("/:id/update-quantity", itemController.updateQuantity);

export default router;
