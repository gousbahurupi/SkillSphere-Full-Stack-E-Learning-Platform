import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses, deleteCourse } from "../../services/course.service";

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
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    await deleteCourse(id);
    alert("Course deleted");
    window.location.reload(); // simple + safe for now
  };

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-500">
              {course.category} • {course.difficulty}
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => navigate(`/admin/courses/${course._id}/edit`)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() =>
                navigate(`/admin/courses/${course._id}/lessons`)
              }
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Manage Lessons
            </button>

            <button
              onClick={() => handleDelete(course._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
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
