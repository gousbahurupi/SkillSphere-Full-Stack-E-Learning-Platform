import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseBySlug } from "../services/course.service";

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseBySlug(slug).then(setCourse);
  }, [slug]);

  if (!course) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      <div className="flex gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          {course.difficulty}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </span>
      </div>

      <h2 className="text-2xl font-semibold mb-3">Lessons</h2>

      <ul className="space-y-3">
        {course.lessons.map((lesson, index) => (
          <li
            key={lesson._id}
            className="border p-3 rounded hover:bg-gray-50"
          >
            <Link
              className="text-blue-600 font-medium"
            >
              {lesson.order}. {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
