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

      // ✅ CORRECT BACKEND ROUTE
      await api.delete(`/courses/${id}/lessons/${lessonId}`);

      // update UI instantly
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.filter(
          (lesson) => lesson._id !== lessonId
        ),
      }));

      alert("Lesson deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p className="p-4">Loading...</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">
        Manage Lessons – {course.title}
      </h1>

      <button
        onClick={() =>
          navigate(`/admin/courses/${course._id}/lessons/add`)
        }
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        ➕ Add Lesson
      </button>

      <div className="space-y-3">
        {course.lessons.length === 0 && (
          <p className="text-gray-500">No lessons added yet.</p>
        )}

        {course.lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-gray-500">
                Order: {lesson.order}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() =>
                  navigate(
                    `/admin/courses/${course._id}/lessons/${lesson._id}/edit`
                  )
                }
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded"
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
