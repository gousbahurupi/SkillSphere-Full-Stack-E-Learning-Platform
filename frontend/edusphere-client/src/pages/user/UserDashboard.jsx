import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/course.service";
import { enrollCourse } from "../../services/enrollment.service";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  const handleEnroll = async (course) => {
    if (course.price > 0) {
      navigate(`/payment/${course._id}`);
    } else {
      await enrollCourse(course._id);
      alert("Enrolled successfully!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>

      {/* FREE COURSES */}
      <h2 className="text-xl font-semibold mb-3">Free Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {courses
          .filter((c) => c.price === 0)
          .map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEnroll={handleEnroll}
            />
          ))}
      </div>

      {/* PAID COURSES */}
      <h2 className="text-xl font-semibold mb-3">Paid Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses
          .filter((c) => c.price > 0)
          .map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEnroll={handleEnroll}
            />
          ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course, onEnroll }) => (
  <div className="bg-white p-4 shadow rounded">
    <h3 className="font-bold text-lg">{course.title}</h3>
    <p className="text-sm text-gray-600">{course.description}</p>

    <p className="mt-2 font-semibold">
      {course.price === 0 ? "FREE" : `₹${course.price}`}
    </p>

    <button
      onClick={() => onEnroll(course)}
      className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full"
    >
      Enroll
    </button>
  </div>
);

export default UserDashboard;
