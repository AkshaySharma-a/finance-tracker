const AppError = require("../errors/AppError");

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.parse(req.body);
      req.body = result; // validated & transformed data
      next();
    } catch (error) {
      if (error.name === "ZodError") {
        const message = error.errors.map((e) => e.message).join(", ");
        return next(new AppError(400, message));
      }
      next(error);
    }
  };
};

module.exports = validateMiddleware;
