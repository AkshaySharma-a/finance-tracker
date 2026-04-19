const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const config = require("../config/env");

// Closure factory (as required) - accepts optional roles array
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError(401, "Access token is required"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return next(new AppError(403, "Forbidden - insufficient permissions"));
      }

      next();
    } catch (err) {
      return next(new AppError(401, "Invalid or expired token"));
    }
  };
};

module.exports = authMiddleware;
