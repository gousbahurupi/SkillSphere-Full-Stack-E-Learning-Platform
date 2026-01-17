import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);

export default router;
