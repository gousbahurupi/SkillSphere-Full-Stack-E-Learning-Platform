import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },

    completedLessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    ],

    progress: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
