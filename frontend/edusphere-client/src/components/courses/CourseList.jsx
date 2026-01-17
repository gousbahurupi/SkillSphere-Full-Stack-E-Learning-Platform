import CourseCard from "./CourseCard";
import { useCourses } from "../../context/CourseContext";
import Loader from "../common/Loader";

const CourseList = () => {
  const { courses, loading } = useCourses();

  if (loading) {
    return <Loader text="Loading courses..." />;
  }

  if (!courses.length) {
    return (
      <p className="text-center text-gray-400">
        No courses available yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
