const userService = require("./user.service");
const { successResponse } = require("../../utils/response");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    successResponse(res, user, "Profile updated successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
