import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col hover:scale-[1.02] transition duration-300">
      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-2">
        {course.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-300 text-sm mb-4 flex-grow">
        {course.description.length > 100
          ? course.description.slice(0, 100) + "..."
          : course.description}
      </p>

      {/* PRICE */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-primary font-bold text-lg">
          {course.price === 0 ? "FREE" : `₹${course.price}`}
        </span>

        <Link
          to={`/courses/${course.slug}`}
          className="text-sm font-semibold hover:text-secondary transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
