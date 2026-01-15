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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse(formData);
      alert("Course created successfully");

      // reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "beginner",
        price: "",
      });
    } catch (error) {
      alert(error.message || "Failed to create course");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add Course</h2>

      <input
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />

      <textarea
        name="description"
        placeholder="Course Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />

      <input
        name="category"
        placeholder="Category (e.g. Programming)"
        value={formData.category}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        value={formData.price}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
        min="0"
        required
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Create Course
      </button>
    </form>
  );
};

export default CourseForm;
