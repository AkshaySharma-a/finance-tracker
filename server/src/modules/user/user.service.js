const userRepo = require("./user.repository");
const AppError = require("../../errors/AppError");

const getUserById = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new AppError(404, "User not found");
  return user;
};

const updateUser = async (id, data) => {
  const user = await userRepo.update(id, data);
  if (!user) throw new AppError(404, "User not found");
  return user;
};

module.exports = { getUserById, updateUser };
