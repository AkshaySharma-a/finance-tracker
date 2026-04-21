const authService = require("./auth.service");
const { successResponse } = require("../../utils/response");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    successResponse(res, result, "User registered successfully", 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    successResponse(res, result, "Login successful");
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    successResponse(res, result, "Token refreshed successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh };
