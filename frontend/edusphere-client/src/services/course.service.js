import api from "../api/axios";

/**
 * =========================
 * PUBLIC (User)
 * =========================
 */

// Get all courses
export const getAllCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

// Get single course by slug (with lessons)
export const getCourseBySlug = async (slug) => {
  const res = await api.get(`/courses/${slug}`);
  return res.data;
};

/**
 * =========================
 * ADMIN
 * =========================
 */

// Create new course (Admin only)
export const createCourse = async (data) => {
  const res = await api.post("/courses", data);
  return res.data;
};

// Add lesson to a course (Admin only)
export const addLesson = async (courseId, data) => {
  const res = await api.post(`/courses/${courseId}/lessons`, data);
  return res.data;
};

// Update course
export const updateCourse = async (id, data) => {
  const res = await api.put(`/courses/${id}`, data);
  return res.data;
};

// Delete course (optional – future)
export const deleteCourse = async (id) => {
  const res = await api.delete(`/courses/${id}`);
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await api.get(`/courses/id/${id}`);
  return res.data;
};

// Update lesson
export const updateLesson = async (courseId, lessonId, data) => {
  const res = await api.put(
    `/courses/${courseId}/lessons/${lessonId}`,
    data
  );
  return res.data;
};

// Delete lesson
export const deleteLesson = async (courseId, lessonId) => {
  const res = await api.delete(
    `/courses/${courseId}/lessons/${lessonId}`
  );
  return res.data;
};

