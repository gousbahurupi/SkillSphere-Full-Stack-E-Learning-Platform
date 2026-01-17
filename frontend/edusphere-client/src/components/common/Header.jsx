import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/skillsphere.svg";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="glass mx-4 md:mx-8 mt-4 px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          {/* Replace with SVG logo later */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="SkillSphere Logo"
              className="h-10"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {!user && (
            <>
              <Link to="/courses" className="hover:text-secondary">
                Courses
              </Link>
              <Link to="/login" className="hover:text-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Signup
              </Link>
            </>
          )}

          {user?.role === "user" && (
            <>
              <Link to="/dashboard" className="hover:text-secondary">
                Dashboard
              </Link>
              <Link to="/my-courses" className="hover:text-secondary">
                My Courses
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className="hover:text-accent font-semibold"
              >
                Admin
              </Link>
              <Link to="/admin/courses" className="hover:text-secondary">
                Courses
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden glass mx-4 mt-2 p-4 space-y-3 text-sm">
          {!user && (
            <>
              <MobileLink to="/courses" setOpen={setOpen}>
                Courses
              </MobileLink>
              <MobileLink to="/login" setOpen={setOpen}>
                Login
              </MobileLink>
              <MobileLink to="/signup" setOpen={setOpen}>
                Signup
              </MobileLink>
            </>
          )}

          {user?.role === "user" && (
            <>
              <MobileLink to="/dashboard" setOpen={setOpen}>
                Dashboard
              </MobileLink>
              <MobileLink to="/my-courses" setOpen={setOpen}>
                My Courses
              </MobileLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <MobileLink to="/admin/dashboard" setOpen={setOpen}>
                Admin Dashboard
              </MobileLink>
              <MobileLink to="/admin/courses" setOpen={setOpen}>
                Manage Courses
              </MobileLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

    </header>
  );
};

const MobileLink = ({ to, children, setOpen }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="block px-4 py-3 rounded-xl hover:bg-white/10 transition"
  >
    {children}
  </Link>
);

export default Header;
