import CourseList from "../components/courses/CourseList";

const Courses = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <CourseList />
    </div>
  );
};

export default Courses;
