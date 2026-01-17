import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  getAdminStats
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);




router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

export default router;
