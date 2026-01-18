import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import logo from "../assets/SkillSphere.svg";
import { validateSignup } from "../uitls/validators";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignup(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden rounded-3xl">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-md p-8 rounded-3xl relative z-10 space-y-4"
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo} alt="SkillSphere" className="h-10" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h2>

        {/* NAME */}
        <div>
          <input
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && (
            <p className="text-sm text-red-400 mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 pr-12 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-400 mt-1">{errors.password}</p>
          )}
        </div>

        {/* ROLE */}
        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
        >
          <UserPlus size={18} />
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
