import CourseForm from "../components/admin/CourseForm";
import LessonForm from "../components/admin/LessonForm";
const Admin = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <CourseForm />
      <LessonForm courseId="69662a46478978e9b24e4077" />
    </div>
  );
};

export default Admin;
