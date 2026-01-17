import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

/* ================= ICON ================= */

const CourseIcon = () => (
  <svg
    className="w-7 h-7 text-blue-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 20l9-5-9-5-9 5 9 5z" />
    <path d="M12 12l9-5-9-5-9 5 9 5z" />
  </svg>
);

/* ================= PAGE ================= */

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/enroll/my-courses");
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          My Courses
        </h1>
        <p className="text-gray-300">
          Continue learning where you left off
        </p>
      </div>

      {/* EMPTY STATE */}
      {courses.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-gray-300 mb-3">
            You are not enrolled in any courses yet.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
          >
            Browse Courses
          </Link>
        </div>
      )}

      {/* COURSE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((enroll) => (
          <CourseCard
            key={enroll._id}
            enroll={enroll}
          />
        ))}
      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const CourseCard = ({ enroll }) => {
  const progress = enroll.progress || 0;

  return (
    <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <CourseIcon />
        <h2 className="text-lg font-semibold text-white">
          {enroll.course.title}
        </h2>
      </div>

      <p className="text-sm text-gray-300 flex-grow">
        {enroll.course.description}
      </p>

      {/* PROGRESS */}
      <div className="mt-5">
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Progress: {progress}%
        </p>
      </div>

      {/* ACTION */}
      <Link
        to={`/course/${enroll.course._id}`}
        className="mt-5 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
      >
        Continue Learning
      </Link>
    </div>
  );
};

export default MyCourses;
