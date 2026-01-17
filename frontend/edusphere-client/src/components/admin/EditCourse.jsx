import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import {
  getCourseById,
  updateCourse,
} from "../../services/course.service";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    price: 0,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourseById(id);
      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        difficulty: data.difficulty,
        price: data.price,
      });
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCourse(id, formData);
    alert("Course updated successfully");
    navigate("/admin/courses");
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Edit Course
        </h1>
        <p className="text-gray-400 text-sm">
          Update course details and pricing information
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="glass p-8 rounded-3xl max-w-2xl space-y-5"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Course Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="input"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course description"
            rows={4}
            className="input resize-none"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Category
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Programming"
            className="input"
            required
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PRICE */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="input"
            />
          </div>

          {/* DIFFICULTY */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="input"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">
                Intermediate
              </option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Update Course
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="btn-secondary px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditCourse;
