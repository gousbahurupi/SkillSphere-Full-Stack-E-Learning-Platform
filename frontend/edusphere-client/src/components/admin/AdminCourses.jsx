import AdminLayout from "./AdminLayout";
import AdminCourseList from "../../components/admin/AdminCourseList";
import { Link } from "react-router-dom";


const AdminCourses = () => {
  return (

    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
      <Link
        to="/admin/manage-courses"
        className="btn block bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 text-center"
      >
        Add New Courses
      </Link>
      <AdminCourseList />
    </AdminLayout>
  );
};

export default AdminCourses;
