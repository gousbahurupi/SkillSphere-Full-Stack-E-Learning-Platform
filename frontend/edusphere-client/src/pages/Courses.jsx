import CourseList from "../components/courses/CourseList";

const Courses = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Explore Courses
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Browse industry-ready courses designed to help you
          build real-world skills and grow your career.
        </p>
      </div>

      <CourseList />
    </section>
  );
};

export default Courses;
