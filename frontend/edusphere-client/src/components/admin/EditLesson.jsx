import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { updateLesson } from "../../services/course.service";
import AdminLayout from "./AdminLayout";

const EditLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState({
    title: "",
    contentHtml: "",
    videoUrl: "",
    order: 1,
  });

  useEffect(() => {
    api.get(`/courses/id/${courseId}`).then((res) => {
      const found = res.data.lessons.find(
        (l) => l._id === lessonId
      );
      setLesson(found);
    });
  }, [courseId, lessonId]);

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLesson(courseId, lessonId, lesson);
    alert("Lesson updated");
    navigate(-1);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <input
          name="title"
          value={lesson.title}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <textarea
          name="contentHtml"
          value={lesson.contentHtml}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="videoUrl"
          value={lesson.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          className="w-full p-2 border"
        />

        <input
          type="number"
          name="order"
          value={lesson.order}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditLesson;
