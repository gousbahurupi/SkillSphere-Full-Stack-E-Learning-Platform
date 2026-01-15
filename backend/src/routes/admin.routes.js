import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      admin: req.user,
    });
  }
);

export default router;
