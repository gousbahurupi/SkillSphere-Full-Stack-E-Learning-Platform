import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/enroll/my-courses").then((res) => {
      setCourses(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {courses.map((enroll) => (
        <div
          key={enroll._id}
          className="bg-white p-4 mb-4 rounded shadow"
        >
          <h2 className="text-lg font-semibold">
            {enroll.course.title}
          </h2>

          <div className="mt-2">
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-600 h-3 rounded"
                style={{ width: `${enroll.progress}%` }}
              />
            </div>
            <p className="text-sm mt-1">
              Progress: {enroll.progress}%
            </p>
          </div>

          <Link
            to={`/course/${enroll.course._id}`}
            className="inline-block mt-3 text-blue-600"
          >
            Continue Course →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
