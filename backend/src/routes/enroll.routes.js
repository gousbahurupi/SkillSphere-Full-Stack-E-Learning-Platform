import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  enrollCourse,
  getMyCourses,
  completeLesson,
} from "../controllers/enrollment.controller.js";

const router  = express.Router();

router .post("/:courseId", authMiddleware, enrollCourse);
router .get("/my-courses", authMiddleware, getMyCourses);
router.post(
  "/:courseId/lesson/:lessonId/complete",
  authMiddleware,
  completeLesson
);
export default router ;
