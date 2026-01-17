import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    const totalStudents = await Enrollment.distinct("user").then(
      (users) => users.length
    );

    const revenueAgg = await Course.aggregate([
      { $match: { price: { $gt: 0 } } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const revenue = revenueAgg[0]?.total || 0;

    res.json({
      totalCourses,
      totalStudents,
      revenue,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};
