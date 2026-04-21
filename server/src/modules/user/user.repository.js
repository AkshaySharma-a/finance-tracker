const User = require("./user.model");

const findByEmail = async (email) =>
  User.findOne({ email }).select("+password");

const findById = async (id) => User.findById(id).select("-password");

const create = async (userData) => {
  const newUse = new User(userData);
  return newUse.save();
};

const update = async (id, updateData) => {
  return User.findByIdAndUpdate(id, updateData, { new: true }).select(
    "-password"
  );
};

module.exports = { findByEmail, create, findById, update };
