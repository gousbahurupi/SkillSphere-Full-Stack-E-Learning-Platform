import { deleteLesson } from "../../services/course.service";
import { useNavigate } from "react-router-dom";

const LessonList = ({ course }) => {
  const navigate = useNavigate();

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    await deleteLesson(course._id, lessonId);
    window.location.reload();
  };

  return (
    <div className="space-y-3">
      {course.lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div>
            <h4 className="font-semibold">{lesson.title}</h4>
            <p className="text-sm text-gray-500">
              Order: {lesson.order}
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() =>
                navigate(
                  `/admin/course/${course._id}/lesson/${lesson._id}/edit`
                )
              }
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(lesson._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
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
