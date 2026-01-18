const adminMiddleware = (req, res, next) => {
  // 🔒 Ensure user is attached by auth middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // 🔐 Role check
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

export default adminMiddleware;
