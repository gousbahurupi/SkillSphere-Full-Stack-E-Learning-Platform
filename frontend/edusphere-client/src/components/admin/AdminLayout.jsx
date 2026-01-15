import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-yellow-400">
          Admin Panel
        </h2>

        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="block hover:text-yellow-400"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/manage-courses"
            className="block hover:text-yellow-400"
          >
            Manage Courses
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
