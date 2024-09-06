import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

// Get user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Get user by ID
const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Update user's password
const updatePassword = async (userId, newPassword) => {
  return await User.update(
    { password: newPassword },
    { where: { id: userId } }
  );
};

export { createUser, getUserByEmail, getUserById, updatePassword };
