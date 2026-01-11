import express from "express";
import {
  createCourse,
  getCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);

router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

export default router;
