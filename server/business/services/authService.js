// service/business/services/authService.js
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updatePassword,
} from "../../data/repositories/authRepository.js";

const registerUser = async (email, username, password) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error("Email is already in use!");

  const hash = await bcrypt.hash(password, 10);
  await createUser({ email, username, password: hash });
};

const findUserByEmail = async (email) => {
  return await getUserByEmail(email);
};

const findUserById = async (id) => {
  return await getUserById(id);
};

const updateUserPassword = async (userId, hash) => {
  return await updatePassword(userId, hash);
};

export { registerUser, findUserByEmail, findUserById, updateUserPassword };
