import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/SkillSphere.svg";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-background text-white rounded-3xl overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 flex-col glass m-4 rounded-3xl p-6">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="SkillSphere" className="h-10" />
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-2 text-sm">
          <AdminLink
            to="/admin/dashboard"
            active={isActive("/admin/dashboard")}
          >
            Dashboard
          </AdminLink>

          <AdminLink
            to="/admin/courses"
            active={isActive("/admin/courses")}
          >
            Manage Courses
          </AdminLink>

          <AdminLink
            to="/admin/manage-courses"
            active={isActive("/admin/manage-courses")}
          >
            Create Course
          </AdminLink>
        </nav>

        {/* FOOTER */}
        <div className="mt-auto text-xs text-gray-400 pt-6">
          © 2026 SkillSphere
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

/* ================= COMPONENT ================= */

const AdminLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-4 py-3 rounded-xl transition ${
      active
        ? "bg-primary/20 text-primary font-semibold"
        : "hover:bg-white/10 text-gray-300"
    }`}
  >
    {children}
  </Link>
);

export default AdminLayout;
