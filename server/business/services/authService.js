// server/business/services/authService.js
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updatePassword,
} from "../../data/repositories/authRepository.js";

const saltRounds = 10;

const registerUser = async (email, username, password) => {
  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByUsername = await getUserByUsername(username);
  if (existingUserByEmail) throw new Error("Email is already in use!");
  else if (existingUserByUsername)
    throw new Error("Username is already in use!");

  const hash = await bcrypt.hash(password, saltRounds);
  await createUser({ email, username, password: hash });
};

const findUserByEmail = async (email) => {
  return await getUserByEmail(email);
};

const findUserByUsername = async (username) => {
  return await getUserByUsername(username);
};

const findUserById = async (id) => {
  return await getUserById(id);
};

const updateUserPassword = async (userId, password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return await updatePassword(userId, hash);
};

export {
  registerUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updateUserPassword,
};
