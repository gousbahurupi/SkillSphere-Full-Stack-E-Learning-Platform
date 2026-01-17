import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { updateLesson } from "../../services/course.service";
import AdminLayout from "./AdminLayout";

const EditLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/courses/id/${courseId}`);
        const found = res.data.lessons.find(
          (l) => l._id === lessonId
        );
        setLesson(found);
      } catch (error) {
        console.error(error);
        alert("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

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
    await updateLesson(courseId, lessonId, lesson);
    alert("Lesson updated successfully");
    navigate(-1);
  };

  if (loading || !lesson) {
    return (
      <AdminLayout>
        <p className="text-gray-400">Loading lesson...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Edit Lesson
        </h1>
        <p className="text-gray-400 text-sm">
          Update lesson content and media
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
            value={lesson.videoUrl || ""}
            onChange={handleChange}
            placeholder="YouTube embed / Vimeo / MP4"
            className="input"
          />
          <p className="text-xs text-gray-400 mt-1">
            Leave empty if this is a text-only lesson
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
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary px-8 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditLesson;
