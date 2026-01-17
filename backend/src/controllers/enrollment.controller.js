/**
 * Enrollment Controller
 */

import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

/**
 * Enroll in a course (Free or Paid)
 * POST /api/enroll/:courseId
 */
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    // 1️⃣ Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    // ✅ IMPORTANT FIX
    // If already enrolled, return enrollment instead of error
    if (existingEnrollment) {
      return res.status(200).json({
        message: "Already enrolled",
        enrollment: existingEnrollment,
      });
    }

    // 3️⃣ Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    return res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    // 🛡 Handle duplicate key error safely (race condition)
    if (error.code === 11000) {
      const enrollment = await Enrollment.findOne({
        user: req.user._id,
        course: req.params.courseId,
      });

      return res.status(200).json({
        message: "Already enrolled",
        enrollment,
      });
    }

    console.error("Enroll course error:", error);
    return res.status(500).json({ message: "Enrollment failed" });
  }
};

/**
 * Get logged-in user's enrolled courses
 * GET /api/enroll/my-courses
 */
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id,
    })
      .populate("course")
      .sort({ createdAt: -1 });

    return res.json(enrollments);
  } catch (error) {
    console.error("Get my courses error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Mark lesson as completed
 * POST /api/enroll/:courseId/lesson/:lessonId/complete
 */
export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in this course" });
    }

    // Prevent duplicate lesson entries
    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    const course = await Course.findById(courseId);

    const totalLessons = course?.lessons?.length || 0;

    enrollment.progress =
      totalLessons > 0
        ? Math.round(
            (enrollment.completedLessons.length / totalLessons) * 100
          )
        : 0;

    if (enrollment.progress >= 100) {
      enrollment.status = "completed";
    }

    await enrollment.save();

    return res.json(enrollment);
  } catch (error) {
    console.error("Complete lesson error:", error);
    return res.status(500).json({
      message: "Failed to complete lesson",
      error: error.message,
    });
  }
};
