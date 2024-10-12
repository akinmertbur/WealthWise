// server/business/services/authService.js
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updatePassword,
  editUsername,
  editEmail,
  deleteUser,
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
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return await updatePassword(userId, hash);
  } catch (err) {
    throw new Error(`Failed to edit password: ${err.message}`);
  }
};

const changeUsername = async (userId, username) => {
  if (!userId) {
    throw new Error("Invalid user ID");
  }

  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("Invalid username");
  }

  return await editUsername(userId, username);
};

const changeEmail = async (userId, email) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email is already in use!");
  }

  if (!userId) {
    throw new Error("Invalid user ID");
  }

  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("Invalid email");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  return await editEmail(userId, email);
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const removeUser = async (userId) => {
  try {
    // Check whether userId is entered
    if (!userId) {
      throw new Error("User Id is required for deletion of the user!");
    }

    return await deleteUser(userId);
  } catch (err) {
    throw new Error(`Failed to delete user: ${err.message}`);
  }
};

export {
  registerUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updateUserPassword,
  changeUsername,
  changeEmail,
  removeUser,
};
