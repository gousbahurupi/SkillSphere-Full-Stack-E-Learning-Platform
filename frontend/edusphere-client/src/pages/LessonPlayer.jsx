import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseBySlug } from "../services/course.service";

const LessonPlayer = () => {
  const { slug, index } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    getCourseBySlug(slug).then((course) => {
      setLesson(course.lessons[index]);
    });
  }, [slug, index]);

  if (!lesson) return <p className="p-6">Loading lesson...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

      {lesson.videoUrl && (
        <iframe
          className="w-full h-96 mb-6"
          src={lesson.videoUrl}
          title="Lesson video"
          allowFullScreen
        />
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />
    </div>
  );
};

export default LessonPlayer;
