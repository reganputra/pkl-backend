import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.mjs";
import authMiddleware from "../middlewares/authMiddleware.mjs";

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/profile", authMiddleware, userController.getUserProfile);

export default router;
