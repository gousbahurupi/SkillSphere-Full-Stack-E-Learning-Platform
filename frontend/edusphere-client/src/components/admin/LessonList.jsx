import { deleteLesson } from "../../services/course.service";
import { useNavigate } from "react-router-dom";

const LessonList = ({ course }) => {
  const navigate = useNavigate();

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    await deleteLesson(course._id, lessonId);
    alert("Lesson deleted");
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {course.lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="glass p-5 rounded-2xl flex justify-between items-center"
        >
          {/* INFO */}
          <div>
            <h4 className="text-lg font-semibold">
              {lesson.title}
            </h4>
            <p className="text-sm text-gray-400">
              Order: {lesson.order}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(
                  `/admin/courses/${course._id}/lessons/${lesson._id}/edit`
                )
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(lesson._id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
