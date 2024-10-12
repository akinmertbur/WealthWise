// server/routes/authRoutes.js
import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
  checkAuthController,
  editUsername,
  editEmail,
  deleteUser,
} from "../controllers/authController.js";
import {
  validateCreateUser,
  validateLogin,
  validateEditPassword,
  validateEditUsername,
  validateEditEmail,
  validateDeleteUser,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateLogin, loginUserController);
router.post("/register", validateCreateUser, registerUserController);
router.post("/logout", logoutUserController);
router.patch("/editPassword", validateEditPassword, editPasswordController);
router.get("/checkAuth", checkAuthController);
router.patch("/editUsername", validateEditUsername, editUsername);
router.patch("/editEmail", validateEditEmail, editEmail);
router.delete("/delete", validateDeleteUser, deleteUser);

export default router;
