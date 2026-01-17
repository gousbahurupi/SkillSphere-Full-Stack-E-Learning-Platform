import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  enrollCourse,
  getMyCourses,
  completeLesson,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

/**
 * Get logged-in user's courses
 * GET /api/enroll/my-courses
 */
router.get(
  "/my-courses",
  authMiddleware,
  getMyCourses
);

/**
 * Mark lesson as completed
 * POST /api/enroll/:courseId/lesson/:lessonId/complete
 */
router.post(
  "/:courseId/lesson/:lessonId/complete",
  authMiddleware,
  completeLesson
);

/**
 * Enroll in a course (Free / Paid)
 * POST /api/enroll/:courseId
 */
router.post(
  "/:courseId",
  authMiddleware,
  enrollCourse
);

export default router;
