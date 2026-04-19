const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const validate = require("../../middleware/validate.middleware");
const { updateUserDto } = require("./user.dto");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/profile", authMiddleware(), userController.getProfile);
router.put(
  "/profile",
  authMiddleware(),
  validate(updateUserDto),
  userController.updateProfile
);

module.exports = router;
