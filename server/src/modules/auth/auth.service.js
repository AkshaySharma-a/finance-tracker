const userRepo = require("../user/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/env");
const AppError = require("../../errors/AppError");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.JWT_SECRET,
    { expiresIn: config.JWT_ACCESS_EXPIRY }
  );
  const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRY,
  });
  return { accessToken, refreshToken };
};

const register = async (userData) => {
  const existing = await userRepo.findByEmail(userData.email);
  if (existing) throw new AppError(400, "User already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await userRepo.create({ ...userData, password: hashedPassword });

  const tokens = generateTokens(user);
  return {
    user: { id: user._id, name: user.name, email: user.email },
    ...tokens,
  };
};

const login = async (credentials) => {
  const user = await userRepo.findByEmail(credentials.email);
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new AppError(401, "Invalid credentials");
  }

  const tokens = generateTokens(user);
  return {
    user: { id: user._id, name: user.name, email: user.email },
    ...tokens,
  };
};

const refreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const user = await userRepo.findById(decoded.id);
    if (!user) throw new AppError(401, "Invalid refresh token");

    const { accessToken } = generateTokens(user);
    return { accessToken };
  } catch (err) {
    throw new AppError(401, "Invalid or expired refresh token");
  }
};

module.exports = { register, login, refreshToken };
