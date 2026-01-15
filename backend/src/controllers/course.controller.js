import Course from "../models/Course.js";
import slugify from "slugify";

/**
 * Create course (Admin only)
 */
export const createCourse = async (req, res) => {
  try {
    const { title } = req.body;

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const course = await Course.create({
      ...req.body,
      slug,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all courses (Public)
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("-lessons");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Get course by slug (Public)
 */
export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update course (Admin only)
 */
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * Delete course (Admin only)
 */
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add lesson to course (Admin only)
 */
// Add lesson
export const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.lessons.push(req.body);
    await course.save();

    res.status(201).json(course.lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lesson
export const updateLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = course.lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    Object.assign(lesson, req.body);
    await course.save();

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lesson
export const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.lessons = course.lessons.filter(
      (lesson) => lesson._id.toString() !== lessonId
    );

    await course.save();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
