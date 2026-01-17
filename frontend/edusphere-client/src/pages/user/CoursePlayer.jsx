import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

/* ================= HELPERS ================= */
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const ytMatch =
      url.match(/youtu\.be\/([^?]+)/) ||
      url.match(/youtube\.com\/watch\?v=([^&]+)/);

    if (!ytMatch) return null;

    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  } catch {
    return null;
  }
};

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrolledCourse();
  }, [courseId]);

  /* ================= LOAD ENROLLED COURSE ================= */
  const loadEnrolledCourse = async () => {
    try {
      const res = await api.get("/enroll/my-courses");

      const enrollment = res.data.find(
        (e) => e.course._id === courseId
      );

      if (!enrollment) {
        alert("You are not enrolled in this course");
        navigate("/courses");
        return;
      }

      setCourse(enrollment.course);
      setCompletedLessons(enrollment.completedLessons || []);

      if (enrollment.course.lessons?.length > 0) {
        setActiveLesson(enrollment.course.lessons[0]);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MARK LESSON COMPLETE ================= */
  const markLessonComplete = async () => {
    try {
      await api.post(
        `/enroll/${courseId}/lesson/${activeLesson._id}/complete`
      );

      setCompletedLessons((prev) =>
        prev.includes(activeLesson._id)
          ? prev
          : [...prev, activeLesson._id]
      );
    } catch (err) {
      console.error(err);
      alert("Could not mark lesson complete");
    }
  };

  if (loading) {
    return <p className="p-6">Loading course...</p>;
  }

  if (!course || !activeLesson) {
    return <p className="p-6">No lessons available</p>;
  }

  /* ================= PROGRESS ================= */
  const progress =
    Math.round(
      (completedLessons.length / course.lessons.length) * 100
    ) || 0;

  const videoEmbedUrl = getYouTubeEmbedUrl(
    activeLesson.videoUrl
  );

  return (
    <div className="flex h-[90vh]">
      {/* LEFT: LESSON LIST */}
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-2">
          {course.title}
        </h2>

        {/* PROGRESS */}
        <div className="mb-4">
          <div className="h-2 bg-gray-300 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">
            {progress}% completed
          </p>
        </div>

        {course.lessons.map((lesson, index) => (
          <div
            key={lesson._id}
            onClick={() => setActiveLesson(lesson)}
            className={`p-2 mb-2 rounded cursor-pointer ${
              activeLesson._id === lesson._id
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <span>
                {index + 1}. {lesson.title}
              </span>

              {completedLessons.includes(lesson._id) && (
                <span className="text-green-600 font-bold">
                  ✔
                </span>
              )}
            </div>
          </div>
        ))}
      </aside>

      {/* RIGHT: PLAYER */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-4">
          {activeLesson.title}
        </h1>

        {/* VIDEO (only if valid YouTube URL) */}
        {videoEmbedUrl && (
          <div className="mb-6">
            <iframe
              src={videoEmbedUrl}
              title={activeLesson.title}
              className="w-full h-[400px] rounded"
              allowFullScreen
            />
          </div>
        )}

        {/* CONTENT HTML */}
        {activeLesson.contentHtml && (
          <div
            className="prose max-w-none mb-6"
            dangerouslySetInnerHTML={{
              __html: activeLesson.contentHtml,
            }}
          />
        )}

        {/* COMPLETE BUTTON */}
        {!completedLessons.includes(activeLesson._id) && (
          <button
            onClick={markLessonComplete}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Mark Lesson as Completed
          </button>
        )}
      </main>
    </div>
  );
};

export default CoursePlayer;
