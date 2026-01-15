import api from "../api/axios";

export const getMyCourses = async () => {
  const res = await api.get("/enroll/my-courses");
  return res.data;
};

export const enrollCourse = async (courseId) => {
  const res = await api.post(`/enroll/${courseId}`);
  return res.data;
};
