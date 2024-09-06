// server/routes/authRoutes.js
import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
} from "../controllers/authController.js";
import {
  validateCreateUser,
  validateEditPassword,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/login", loginUserController);
router.post("/register", validateCreateUser, registerUserController);
router.get("/logout", logoutUserController);
router.patch("/editPassword", validateEditPassword, editPasswordController);

export default router;
