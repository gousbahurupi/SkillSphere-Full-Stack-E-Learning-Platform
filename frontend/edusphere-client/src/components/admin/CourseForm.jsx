import { useState } from "react";
import { createCourse } from "../../services/course.service";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCourse(formData);
      alert("Course created successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "beginner",
        price: "",
      });
    } catch (error) {
      alert(error.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">
        Course Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5"
      >
        {/* TITLE */}
        <Input
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Full Stack Web Development"
          required
        />

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm mb-2 text-gray-300">
            Course Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief overview of what students will learn"
            rows={4}
            required
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CATEGORY */}
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Programming, Design"
          required
        />

        {/* PRICE + DIFFICULTY */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0 for Free"
            min="0"
            required
          />

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Difficulty Level
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">
                Intermediate
              </option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-primary hover:opacity-90 transition px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  ...props
}) => (
  <div>
    <label className="block text-sm mb-2 text-gray-300">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);

export default CourseForm;
