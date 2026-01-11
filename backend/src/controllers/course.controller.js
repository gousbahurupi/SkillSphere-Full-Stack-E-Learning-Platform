import Course from "../models/Course.js";
import slugify from "slugify";

/**
 * Create course (Admin)
 */
export const createCourse = async (req, res) => {
  const { title, description, price, category, difficulty, lessons } = req.body;

  const slug = slugify(title, { lower: true });

  const course = await Course.create({
    title,
    slug,
    description,
    price,
    category,
    difficulty,
    lessons,
  });

  res.status(201).json(course);
};

/**
 * Get all courses (Public)
 */
export const getCourses = async (req, res) => {
  const courses = await Course.find().select("-lessons");
  res.json(courses);
};

/**
 * Get course by slug (Public)
 */
export const getCourseBySlug = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

/**
 * Update course (Admin)
 */
export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
};

/**
 * Delete course (Admin)
 */
export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};
