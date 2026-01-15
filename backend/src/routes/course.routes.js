import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  updateLesson,
  deleteLesson,
  getCourseById,
  addLesson,
} from "../controllers/course.controller.js";

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug); 
router.get("/id/:id", authMiddleware, adminMiddleware, getCourseById);
// Admin only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCourse
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCourse
);

// Lesson routes (Admin only)
router.post(
  "/:id/lessons",
  authMiddleware,
  adminMiddleware,
  addLesson
);

router.put(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  adminMiddleware,
  updateLesson
);

router.delete(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  adminMiddleware,
  deleteLesson
);


export default router;
