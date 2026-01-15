import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Total Courses</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">—</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Total Students</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">—</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">₹ —</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
