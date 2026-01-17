import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

/* ================= ICONS ================= */

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-green-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const PlayIcon = () => (
  <svg
    className="w-4 h-4 text-blue-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

/* ================= HELPERS ================= */

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  const match =
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/youtube\.com\/watch\?v=([^&]+)/);

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : null;
};

/* ================= COMPONENT ================= */

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const res = await api.get("/enroll/my-courses");
      const enrollment = res.data.find(
        (e) => e.course._id === courseId
      );

      if (!enrollment) {
        navigate("/courses");
        return;
      }

      setCourse(enrollment.course);
      setCompletedLessons(enrollment.completedLessons || []);
      setActiveLesson(enrollment.course.lessons?.[0]);
    } catch {
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

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
    } catch {
      alert("Failed to update progress");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading course content...
      </div>
    );
  }

  if (!course || !activeLesson) {
    return (
      <div className="p-6 text-center">
        No lessons available
      </div>
    );
  }

  const progress = Math.round(
    (completedLessons.length / course.lessons.length) *
      100
  );

  const videoUrl = getYouTubeEmbedUrl(
    activeLesson.videoUrl
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ================= SIDEBAR ================= */}
      <aside className="lg:w-80 border-r border-white/10 bg-black/30 backdrop-blur-lg">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-bold mb-2">
            {course.title}
          </h2>

          <div className="space-y-1">
            <div className="h-2 bg-white/10 rounded">
              <div
                className="h-2 bg-green-500 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">
              {progress}% completed
            </p>
          </div>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto max-h-[70vh]">
          {course.lessons.map((lesson, idx) => {
            const isActive =
              lesson._id === activeLesson._id;
            const isCompleted =
              completedLessons.includes(lesson._id);

            return (
              <button
                key={lesson._id}
                onClick={() => setActiveLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between ${
                  isActive
                    ? "bg-blue-600/20 border border-blue-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 text-sm">
                  {isCompleted ? (
                    <CheckIcon />
                  ) : (
                    <PlayIcon />
                  )}
                  <span>
                    {idx + 1}. {lesson.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">
          {activeLesson.title}
        </h1>

        {videoUrl && (
          <div className="mb-8 aspect-video rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={videoUrl}
              title={activeLesson.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        {activeLesson.contentHtml && (
          <div
            className="prose prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{
              __html: activeLesson.contentHtml,
            }}
          />
        )}

        {!completedLessons.includes(
          activeLesson._id
        ) && (
          <button
            onClick={markLessonComplete}
            className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-xl font-semibold"
          >
            Mark Lesson as Completed
          </button>
        )}
      </main>
    </div>
  );
};

export default CoursePlayer;
