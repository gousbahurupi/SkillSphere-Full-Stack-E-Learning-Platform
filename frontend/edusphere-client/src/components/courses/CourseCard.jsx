import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg">
      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {course.description.slice(0, 80)}...
      </p>

      <p className="font-semibold mb-2">₹{course.price}</p>

      <Link
        to={`/courses/${course.slug}`}
        className="text-blue-600 font-medium"
      >
        View Details →
      </Link>
    </div>
  );
};

export default CourseCard;
