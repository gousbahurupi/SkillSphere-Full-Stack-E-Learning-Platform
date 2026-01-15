import AdminLayout from "./AdminLayout";
import CourseForm from "../../components/admin/CourseForm";

const ManageCourses = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
      <CourseForm />
    </AdminLayout>
  );
};

export default ManageCourses;
