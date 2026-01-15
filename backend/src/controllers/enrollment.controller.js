
/**
 * Enroll in a course (Free or Paid)
 */
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const alreadyEnrolled = await Enrollment.findOne({
    user: userId,
    course: courseId,
  });

  if (alreadyEnrolled) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId,
    progress: 0,
    completedLessons: [],
    status: "ongoing",
  });

  res.status(201).json(enrollment);
};


/**
 * Get logged-in user's courses
 */
export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.id,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: courseId,
  });

  if (!enrollment) {
    return res.status(404).json({ message: "Not enrolled" });
  }

  if (!enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons.push(lessonId);
  }

  // calculate progress
  const course = await Course.findById(courseId);
  const totalLessons = course.lessons.length;
  const completedCount = enrollment.completedLessons.length;

  enrollment.progress = Math.round(
    (completedCount / totalLessons) * 100
  );

  if (enrollment.progress === 100) {
    enrollment.status = "completed";
  }

  await enrollment.save();

  res.json(enrollment);
};
