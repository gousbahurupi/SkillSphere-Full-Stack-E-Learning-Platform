import api from "../api/axios";

/**
 * Get logged-in user's enrolled courses
 * GET /api/enroll/my-courses
 */
export const getMyCourses = async () => {
  try {
    const res = await api.get("/enroll/my-courses");
    return res.data;
  } catch (error) {
    console.error("Get my courses error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Enroll user in a course (Free or Paid)
 * POST /api/enroll/:courseId
 */
export const enrollCourse = async (courseId) => {
  try {
    const res = await api.post(`/enroll/${courseId}`);
    return res.data;
  } catch (error) {
    console.error("Enroll course error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Mark lesson as completed
 * POST /api/enroll/:courseId/lesson/:lessonId/complete
 */
export const completeLesson = async (courseId, lessonId) => {
  try {
    const res = await api.post(
      `/enroll/${courseId}/lesson/${lessonId}/complete`
    );
    return res.data;
  } catch (error) {
    console.error("Complete lesson error:", error);
    throw error.response?.data || error;
  }
};
