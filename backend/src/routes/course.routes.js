import {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  updateLesson,
  deleteLesson,
  getCourseById,
  addLesson,
  getMyCourses, // ✅ ADD THIS
} from "../controllers/course.controller.js";


const router = express.Router();

/* ================= PUBLIC ================= */
router.get("/", getAllCourses);

// Admin – get own courses
router.get(
  "/admin/my-courses",
  authMiddleware,
  adminMiddleware,
  getMyCourses
);

/* 🔒 ADMIN FETCH BY ID (must come BEFORE :slug) */
router.get(
  "/id/:id",
  authMiddleware,
  adminMiddleware,
  getCourseById
);


/* ================= PUBLIC ================= */
router.get("/:slug", getCourseBySlug);

/* ================= ADMIN ONLY ================= */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCourse
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCourse
);

/* ================= LESSONS (ADMIN) ================= */
router.post(
  "/:id/lessons",
  authMiddleware,
  adminMiddleware,
  addLesson
);

router.put(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  adminMiddleware,
  updateLesson
);

router.delete(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  adminMiddleware,
  deleteLesson
);



export default router;

