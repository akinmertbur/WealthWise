// server/routes/authRoutes.js
import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
  checkAuthController,
} from "../controllers/authController.js";
import {
  validateCreateUser,
  validateLogin,
  validateEditPassword,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateLogin, loginUserController);
router.post("/register", validateCreateUser, registerUserController);
router.post("/logout", logoutUserController);
router.patch("/editPassword", validateEditPassword, editPasswordController);
router.get("/checkAuth", checkAuthController);

export default router;
