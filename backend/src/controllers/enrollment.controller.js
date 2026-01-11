import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

/**
 * Enroll user in a course
 */
export const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  const enrollment = await Enrollment.create({
    userId: req.user.id,
    courseId,
  });

  res.status(201).json(enrollment);
};

/**
 * Get logged-in user's enrollments
 */
export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ userId: req.user.id })
    .populate("courseId", "title slug category difficulty thumbnailUrl");

  res.json(enrollments);
};

/**
 * Update lesson progress
 */
export const updateProgress = async (req, res) => {
  const { lessonId, completed } = req.body;

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  enrollment.progress.set(lessonId, completed);

  // Calculate progress %
  const course = await Course.findById(enrollment.courseId);
  const totalLessons = course.lessons.length;
  const completedLessons = Array.from(enrollment.progress.values()).filter(
    (v) => v === true
  ).length;

  enrollment.progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  await enrollment.save();

  res.json(enrollment);
};
