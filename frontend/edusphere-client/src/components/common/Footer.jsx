import { Link } from "react-router-dom";
import logo from "../../assets/SkillSphere.svg";

const Footer = () => {
  return (
    <footer className="mt-16 mb-16">
      {/* Glass Container */}
      <div className="glass mx-4 md:mx-8 p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-200">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="SkillSphere Logo"
                className="h-10"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              SkillSphere is a modern e-learning platform designed
              to help learners grow skills, track progress, and
              succeed in their careers.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-secondary">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-secondary">
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>Interactive Lessons</li>
              <li>Progress Tracking</li>
              <li>Certificates</li>
              <li>Admin Dashboard</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>Email: support@skillsphere.com</li>
              <li>Location: India</li>
              <li>Learning Anywhere, Anytime</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SkillSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
