import AdminLayout from "./AdminLayout";
import AdminCourseList from "../../components/admin/AdminCourseList";

const AdminCourses = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
      <AdminCourseList />
    </AdminLayout>
  );
};

export default AdminCourses;
