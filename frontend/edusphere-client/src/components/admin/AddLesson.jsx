import { useParams } from "react-router-dom";
import { useState } from "react";
import { addLesson } from "../../services/course.service";
import AdminLayout from "./AdminLayout";

const AddLesson = () => {
  const { id } = useParams();

  const [lesson, setLesson] = useState({
    title: "",
    contentHtml: "",
    videoUrl: "",
    order: 1,
  });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLesson(id, lesson);
    alert("Lesson added successfully");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Add Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <input
          name="title"
          placeholder="Lesson Title"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <textarea
          name="contentHtml"
          placeholder="Lesson Content"
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <input
          name="videoUrl"
          placeholder="Video URL (YouTube / Vimeo / MP4)"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="order"
          placeholder="Order"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Lesson
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddLesson;
