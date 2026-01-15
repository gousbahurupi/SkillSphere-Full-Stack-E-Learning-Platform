import CourseCard from "./CourseCard";
import { useCourses } from "../../context/CourseContext";

const CourseList = () => {
  const { courses, loading } = useCourses();

  if (loading) return <p className="text-center">Loading courses...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
