import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollRoutes from "./routes/enroll.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();
connectDB();

const app = express();

/* =========================
   ✅ PRODUCTION CORS SETUP
   ========================= */
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://skill-sphere-951jl3qt7-gous-bahurupis-projects.vercel.app", // vercel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests without origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARES
   ========================= */
app.use(express.json());

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   SERVER
   ========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
