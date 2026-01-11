import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    progress: {
      type: Map,
      of: Boolean, // lessonId => true/false
      default: {},
    },

    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Prevent duplicate enrollments
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
