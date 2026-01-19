import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

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
// 🔐 Admin: get own courses only
router.get(
  "/admin/my-courses",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const courses = await Course.find({
        createdBy: req.user._id,
      }).select("-lessons");

      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
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
