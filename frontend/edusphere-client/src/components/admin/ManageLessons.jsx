import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "./AdminLayout";

const ManageLessons = () => {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/id/${id}`);
      setCourse(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load course");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      setLoading(true);
      await api.delete(`/courses/${id}/lessons/${lessonId}`);

      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.filter(
          (lesson) => lesson._id !== lessonId
        ),
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Lessons
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Course: {course.title}
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/admin/courses/${course._id}/lessons/add`)
          }
          className="btn-primary px-6 py-3 rounded-xl"
        >
          Add Lesson
        </button>
      </div>

      {/* EMPTY STATE */}
      {course.lessons.length === 0 && (
        <div className="glass p-8 rounded-3xl text-center text-gray-300">
          No lessons added yet.
        </div>
      )}

      {/* LESSON LIST */}
      <div className="space-y-4">
        {course.lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* LEFT */}
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {index + 1}. {lesson.title}
              </h3>
              <p className="text-sm text-gray-400">
                Order: {lesson.order}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(
                    `/admin/courses/${course._id}/lessons/${lesson._id}/edit`
                  )
                }
                className="btn-secondary px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                disabled={loading}
                className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageLessons;
