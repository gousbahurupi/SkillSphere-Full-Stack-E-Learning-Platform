import { Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */
import Landing from "../pages/Landing";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

/* ADMIN */
import Admin from "../components/admin/AdminDashboard";
import ManageCourses from "../components/admin/ManageCourses";
import AdminCourses from "../components/admin/AdminCourses";
import EditCourse from "../components/admin/EditCourse";
import ManageLessons from "../components/admin/ManageLessons";
import EditLesson from "../components/admin/EditLesson";
import AddLesson from "../components/admin/AddLesson";

/* USER */
import UserDashboard from "../pages/user/UserDashboard";
import Payment from "../pages/user/Payment";
import MyCourses from "../pages/user/MyCourses";
import CoursePlayer from "../pages/user/CoursePlayer";

/* AUTH */
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ================= USER ================= */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-courses"
        element={
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        }
      />

      <Route
        path="/course/:courseId"
        element={
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        }
      />

      <Route
        path="/payment/:courseId"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute adminOnly>
            <Admin />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/manage-courses"
        element={
          <PrivateRoute adminOnly>
            <ManageCourses />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <PrivateRoute adminOnly>
            <AdminCourses />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/courses/:id/edit"
        element={
          <PrivateRoute adminOnly>
            <EditCourse />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/courses/:id/lessons"
        element={
          <PrivateRoute adminOnly>
            <ManageLessons />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/courses/:id/lessons/add"
        element={
          <PrivateRoute adminOnly>
            <AddLesson />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/courses/:courseId/lessons/:lessonId/edit"
        element={
          <PrivateRoute adminOnly>
            <EditLesson />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
