import AdminLayout from "./AdminLayout";
import CourseForm from "../../components/admin/CourseForm";

const ManageCourses = () => {
  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Create New Course
        </h1>
        <p className="text-gray-400 text-sm">
          Add a new course to the platform with pricing,
          difficulty, and category details.
        </p>
      </div>

      <CourseForm />
    </AdminLayout>
  );
};

export default ManageCourses;
