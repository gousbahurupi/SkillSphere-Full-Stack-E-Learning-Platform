import Course from "../models/Course.js";
import slugify from "slugify";

/**
 * Create course (Admin only)
 */
export const createCourse = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const course = await Course.create({
      ...req.body,
      slug,
      createdBy: req.user._id, // 🔑 CRITICAL
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};


/**
 * Get all courses (Public)
 */
export const getAllCourses = async (req, res) => {
  try {
    // 🔐 Admin → only own courses
    if (req.user && req.user.role === "admin") {
      const courses = await Course.find({
        createdBy: req.user._id,
      }).select("-lessons");

      return res.json(courses);
    }

    // 🌍 Public users → all courses
    const courses = await Course.find().select("-lessons");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // 🔐 ownership check
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to access this course",
      });
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
    const course = await Course.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // 🔐 ownership check
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to edit this course",
      });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/**
 * Delete course (Admin only)
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id, // 🔐 ownership check
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to delete this course",
      });
    }

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
    const course = await Course.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // 🔐 ownership check
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to modify this course",
      });
    }

    course.lessons.push(req.body);
    await course.save();

    res.status(201).json(course.lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user._id,
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to edit lessons of this course",
      });
    }

    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    Object.assign(lesson, req.body);
    await course.save();

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user._id,
    });

    if (!course) {
      return res.status(403).json({
        message: "You are not allowed to delete lessons of this course",
      });
    }

    course.lessons = course.lessons.filter(
      (lesson) => lesson._id.toString() !== lessonId
    );

    await course.save();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
