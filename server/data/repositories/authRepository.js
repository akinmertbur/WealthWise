// server/data/repositories/authRepository.js
import User from "../models/userModel.js";

const createUser = async (userData) => {
  return await User.create(userData);
};

// Get user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Get user by username
const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
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

const editUsername = async (userId, username) => {
  return await User.update({ username: username }, { where: { id: userId } });
};

const editEmail = async (userId, email) => {
  return await User.update({ email: email }, { where: { id: userId } });
};

const deleteUser = async (user_id) => {
  const row = await User.findOne({ where: { id: user_id } });

  if (row) {
    await row.destroy(); // deletes the row
  }
};

export {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updatePassword,
  editUsername,
  editEmail,
  deleteUser,
};
