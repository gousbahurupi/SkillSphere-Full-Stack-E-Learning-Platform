import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-400">
        SkillSphere
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        {/* ================= PUBLIC ================= */}
        {!user && (
          <>
            <Link to="/courses" className="hover:text-blue-400">
              Courses
            </Link>

            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        )}

        {/* ================= USER ================= */}
        {user?.role === "user" && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>

            <Link to="/my-courses" className="hover:text-blue-400">
              My Courses
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {user?.role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              className="hover:text-yellow-400 font-semibold"
            >
              Admin Dashboard
            </Link>

            <Link to="/admin/courses" className="hover:text-blue-400">
              Manage Courses
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
