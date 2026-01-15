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
      [e.target.name]: e.target.value,
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
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl space-y-3"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border"
          required
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border"
        />

        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Course
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditCourse;
