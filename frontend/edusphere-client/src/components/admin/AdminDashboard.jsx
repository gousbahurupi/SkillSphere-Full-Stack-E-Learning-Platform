import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getAdminStats } from "../../services/admin.service";

/* ================= ICONS ================= */

const BookIcon = () => (
  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 1v22" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6" />
  </svg>
);

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ icon, title, value, desc }) => (
  <div className="glass rounded-2xl p-6 hover:scale-[1.04] transition duration-300">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span className="text-2xl font-bold text-white">
        {value}
      </span>
    </div>
    <h3 className="text-lg font-semibold mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-400">
      {desc}
    </p>
  </div>
);

const ActionCard = ({ title, desc, link }) => (
  <Link
    to={link || "#"}
    className="glass rounded-2xl p-6 hover:bg-white/10 transition block"
  >
    <h3 className="text-lg font-semibold mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-400">
      {desc}
    </p>
  </Link>
);

/* ================= DASHBOARD ================= */

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Overview of platform performance
        </p>
      </div>

      {/* STATS */}
      {loading ? (
        <p className="text-gray-400">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            icon={<BookIcon />}
            title="Total Courses"
            value={stats?.totalCourses ?? 0}
            desc="Courses available on the platform"
          />

          <StatCard
            icon={<UsersIcon />}
            title="Total Students"
            value={stats?.totalStudents ?? 0}
            desc="Active learners enrolled"
          />

          <StatCard
            icon={<RevenueIcon />}
            title="Revenue"
            value={`₹${stats?.revenue ?? 0}`}
            desc="Total earnings from paid courses"
          />
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Create Course"
            desc="Add a new course and lessons"
            link="/admin/manage-courses"
          />
          <ActionCard
            title="Manage Courses"
            desc="Edit or update existing courses"
            link="/admin/courses"
          />
          <ActionCard
            title="Platform Analytics"
            desc="View student and revenue insights"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
