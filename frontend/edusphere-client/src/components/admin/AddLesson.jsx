import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addLesson } from "../../services/course.service";
import AdminLayout from "./AdminLayout";

const AddLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({
    title: "",
    contentHtml: "",
    videoUrl: "",
    order: 1,
  });

  const handleChange = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]:
        e.target.name === "order"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLesson(id, lesson);
    alert("Lesson added successfully");
    navigate(`/admin/courses/${id}/lessons`);
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Add New Lesson
        </h1>
        <p className="text-gray-400 text-sm">
          Create lesson content and optional video
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
            Lesson Title
          </label>
          <input
            name="title"
            value={lesson.title}
            onChange={handleChange}
            placeholder="Enter lesson title"
            className="input"
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Lesson Content (HTML / Text)
          </label>
          <textarea
            name="contentHtml"
            value={lesson.contentHtml}
            onChange={handleChange}
            placeholder="Write lesson explanation or HTML content"
            rows={5}
            className="input resize-none"
            required
          />
        </div>

        {/* VIDEO */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">
            Video URL (Optional)
          </label>
          <input
            name="videoUrl"
            value={lesson.videoUrl}
            onChange={handleChange}
            placeholder="YouTube embed / Vimeo / MP4 link"
            className="input"
          />
          <p className="text-xs text-gray-400 mt-1">
            Leave empty if lesson is text-only
          </p>
        </div>

        {/* ORDER */}
        <div className="max-w-xs">
          <label className="block text-sm mb-1 text-gray-300">
            Lesson Order
          </label>
          <input
            type="number"
            name="order"
            value={lesson.order}
            onChange={handleChange}
            min="1"
            className="input"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="btn-primary px-8 py-3 rounded-xl"
          >
            Add Lesson
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/admin/courses/${id}/lessons`)
            }
            className="btn-secondary px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddLesson;
