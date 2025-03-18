import { Router } from "express";
import Item from "./itemRoutes.mjs";
import Riwayat from "./riwayatRoutes.mjs";
import User from "./userRoutes.mjs";

const router = Router();

router.use("/items", Item);
router.use("/users", User);
router.use("/riwayat", Riwayat);

export default router;
