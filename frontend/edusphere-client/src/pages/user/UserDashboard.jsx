import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../services/course.service";
import {
  enrollCourse,
  getMyCourses,
} from "../../services/enrollment.service";

/* ================= ICONS ================= */

const LearnIcon = () => (
  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 20l9-5-9-5-9 5 9 5z" />
    <path d="M12 12l9-5-9-5-9 5 9 5z" />
  </svg>
);

const ProgressIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 5 5 4-4" />
  </svg>
);

const AccessIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4" />
  </svg>
);

/* ================= DASHBOARD ================= */

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

      // ✅ Always load public courses
      const allCourses = await getAllCourses();
      setCourses(allCourses);

      // ✅ Load enrollments separately (do NOT break dashboard)
      try {
        const myCourses = await getMyCourses();
        setEnrollments(myCourses);
      } catch (err) {
        console.warn("No enrollments yet");
        setEnrollments([]);
      }

    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = (courseId) =>
    enrollments.some((e) => e.course && e.course._id === courseId);

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
      alert("Enrolled successfully");
      loadData();
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-300">
          Continue learning and explore new courses
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <FeatureCard icon={<LearnIcon />} title="Self-Paced Learning" desc="Learn anytime with lifetime access to your courses." />
        <FeatureCard icon={<ProgressIcon />} title="Track Progress" desc="Resume lessons exactly where you stopped." />
        <FeatureCard icon={<AccessIcon />} title="Free & Premium" desc="Start free or unlock advanced paid content." />
      </div>

      {/* FREE COURSES */}
      <h2 className="text-2xl font-bold mb-4">Free Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {courses.filter(c => c.price === 0).map(course => (
          <CourseCard
            key={course._id}
            course={course}
            enrolled={isEnrolled(course._id)}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      {/* PAID COURSES */}
      <h2 className="text-2xl font-bold mb-4">Paid Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.filter(c => c.price > 0).map(course => (
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

/* ================= COMPONENTS ================= */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass rounded-2xl p-6 hover:scale-[1.03] transition">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <p className="text-sm text-gray-300">{desc}</p>
  </div>
);

const CourseCard = ({ course, enrolled, onEnroll }) => (
  <div className="glass rounded-2xl p-6 flex flex-col hover:scale-[1.02] transition">
    <h3 className="font-bold text-lg text-white mb-2">{course.title}</h3>
    <p className="text-sm text-gray-300 flex-grow">{course.description}</p>

    <div className="mt-4 flex items-center justify-between">
      <span className="font-semibold text-white">
        {course.price === 0 ? "FREE" : `₹${course.price}`}
      </span>
    </div>

    <button
      onClick={() => onEnroll(course)}
      className={`mt-4 w-full py-2 rounded-xl font-medium transition ${
        enrolled
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white`}
    >
      {enrolled ? "Continue Learning" : "Enroll Now"}
    </button>
  </div>
);

export default UserDashboard;      return;
    }

    try {
      await enrollCourse(course._id);
      alert("Enrolled successfully");
      loadData();
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-300">
          Continue learning and explore new courses
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <FeatureCard
          icon={<LearnIcon />}
          title="Self-Paced Learning"
          desc="Learn anytime with lifetime access to your courses."
        />
        <FeatureCard
          icon={<ProgressIcon />}
          title="Track Progress"
          desc="Resume lessons exactly where you stopped."
        />
        <FeatureCard
          icon={<AccessIcon />}
          title="Free & Premium"
          desc="Start free or unlock advanced paid content."
        />
      </div>

      {/* FREE COURSES */}
      <h2 className="text-2xl font-bold mb-4">
        Free Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
      <h2 className="text-2xl font-bold mb-4">
        Paid Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

/* ================= COMPONENTS ================= */

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass rounded-2xl p-6 hover:scale-[1.03] transition">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>
    </div>
    <p className="text-sm text-gray-300">
      {desc}
    </p>
  </div>
);

const CourseCard = ({ course, enrolled, onEnroll }) => (
  <div className="glass rounded-2xl p-6 flex flex-col hover:scale-[1.02] transition">
    <h3 className="font-bold text-lg text-white mb-2">
      {course.title}
    </h3>

    <p className="text-sm text-gray-300 flex-grow">
      {course.description}
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="font-semibold text-white">
        {course.price === 0 ? "FREE" : `₹${course.price}`}
      </span>
    </div>

    <button
      onClick={() => onEnroll(course)}
      className={`mt-4 w-full py-2 rounded-xl font-medium transition ${
        enrolled
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white`}
    >
      {enrolled ? "Continue Learning" : "Enroll Now"}
    </button>
  </div>
);

export default UserDashboard;
