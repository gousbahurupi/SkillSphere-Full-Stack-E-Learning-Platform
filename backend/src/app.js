import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";


const app = express();

app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.get("/", (req, res) => {
  res.send("EduSphere API running");
});

export default app;
