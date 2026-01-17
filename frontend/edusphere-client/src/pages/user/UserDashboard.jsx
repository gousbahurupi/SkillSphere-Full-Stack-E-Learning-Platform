import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/course.service";
import {
  enrollCourse,
  getMyCourses,
} from "../../services/enrollment.service";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [allCourses, myCourses] = await Promise.all([
        getAllCourses(),
        getMyCourses(),
      ]);

      setCourses(allCourses);
      setEnrollments(myCourses);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = (courseId) =>
    enrollments.some(
      (e) => e.course && e.course._id === courseId
    );

  const handleEnroll = async (course) => {
    if (isEnrolled(course._id)) {
      navigate(`/course/${course._id}`);
      return;
    }

    if (course.price > 0) {
      navigate(`/payment/${course._id}`);
      return;
    }

    try {
      await enrollCourse(course._id);
      alert("Enrolled successfully!");
      loadData(); // refresh enrollments
    } catch (err) {
      alert(err.message || "Enrollment failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Available Courses
      </h1>

      {/* FREE COURSES */}
      <h2 className="text-xl font-semibold mb-3">
        Free Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {courses
          .filter((c) => c.price === 0)
          .map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              enrolled={isEnrolled(course._id)}
              onEnroll={handleEnroll}
            />
          ))}
      </div>

      {/* PAID COURSES */}
      <h2 className="text-xl font-semibold mb-3">
        Paid Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses
          .filter((c) => c.price > 0)
          .map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              enrolled={isEnrolled(course._id)}
              onEnroll={handleEnroll}
            />
          ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course, enrolled, onEnroll }) => (
  <div className="bg-white p-4 shadow rounded flex flex-col">
    <h3 className="font-bold text-lg">
      {course.title}
    </h3>

    <p className="text-sm text-gray-600 flex-grow">
      {course.description}
    </p>

    <p className="mt-2 font-semibold">
      {course.price === 0 ? "FREE" : `₹${course.price}`}
    </p>

    <button
      onClick={() => onEnroll(course)}
      className={`mt-3 px-4 py-2 rounded w-full text-white ${
        enrolled
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {enrolled ? "Continue Course" : "Enroll"}
    </button>
  </div>
);

export default UserDashboard;
