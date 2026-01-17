import AdminLayout from "./AdminLayout";
import AdminCourseList from "../../components/admin/AdminCourseList";
import { Link } from "react-router-dom";

const AdminCourses = () => {
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Manage Courses
          </h1>
          <p className="text-gray-400 text-sm">
            Create, edit, organize lessons, or remove courses
          </p>
        </div>

        <Link
          to="/admin/manage-courses"
          className="btn-primary px-6 py-3 rounded-xl text-center font-semibold"
        >
          Add New Course
        </Link>
      </div>

      <AdminCourseList />
    </AdminLayout>
  );
};

export default AdminCourses;
