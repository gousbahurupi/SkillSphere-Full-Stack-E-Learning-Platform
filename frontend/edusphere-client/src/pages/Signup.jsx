import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { register } = useAuth(); // ✅ MUST exist
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
    alert("Signup successful");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Optional role selection */}
        <select
          name="role"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
