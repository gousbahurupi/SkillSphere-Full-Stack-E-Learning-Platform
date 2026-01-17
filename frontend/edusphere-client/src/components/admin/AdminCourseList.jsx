import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCourses,
  deleteCourse,
} from "../../services/course.service";

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    const data = await getAllCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this course?"
      )
    )
      return;

    await deleteCourse(id);
    fetchCourses(); // better UX than reload
  };

  if (!courses.length) {
    return (
      <div className="glass p-10 rounded-3xl text-center text-gray-400">
        No courses created yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          {/* LEFT INFO */}
          <div>
            <h3 className="text-lg font-semibold">
              {course.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {course.category} • {course.difficulty} •{" "}
              {course.price === 0
                ? "Free"
                : `₹${course.price}`}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                navigate(
                  `/admin/courses/${course._id}/edit`
                )
              }
              className="px-4 py-2 rounded-lg bg-blue-600/80 hover:bg-blue-600 transition text-sm font-medium"
            >
              Edit
            </button>

            <button
              onClick={() =>
                navigate(
                  `/admin/courses/${course._id}/lessons`
                )
              }
              className="px-4 py-2 rounded-lg bg-green-600/80 hover:bg-green-600 transition text-sm font-medium"
            >
              Lessons
            </button>

            <button
              onClick={() => handleDelete(course._id)}
              className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourseList;
