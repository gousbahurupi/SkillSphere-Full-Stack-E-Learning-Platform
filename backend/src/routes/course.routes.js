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
  getMyCourses,
} from "../controllers/course.controller.js";

const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);

/* ================= ADMIN ================= */
router.get(
  "/admin/my-courses",
  authMiddleware,
  adminMiddleware,
  getMyCourses
);

router.get(
  "/id/:id",
  authMiddleware,
  adminMiddleware,
  getCourseById
);

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

/* ================= LESSONS ================= */
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
