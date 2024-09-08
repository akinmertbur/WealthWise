// server/controllers/authController.js
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  registerUser,
  findUserByEmail,
  findUserById,
  updateUserPassword,
} from "../business/services/authService.js";
import { log, error } from "../utils/logger.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByEmail(username);
      if (!user) return done(null, false, { message: "User not found" });

      const isValidPassword = await bcrypt.compare(password, user.password);
      return done(null, isValidPassword ? user : false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user || new Error("User not found"));
  } catch (err) {
    done(err);
  }
});

const registerUserController = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await registerUser(email, username, password);
    res.status(200).json({ message: "You are registered successfully" });
  } catch (err) {
    error(`Error registering user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const loginUserController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "An error occurred" });
    if (!user)
      return res.status(401).json({
        message:
          info?.message || "Email or password is wrong! Please try again!",
      });

    // Log in the user
    req.logIn(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "An error occurred during login" });

      return res.status(200).json({
        message: "Welcome to WealthWise!",
      });
    });
  })(req, res, next);
};

const logoutUserController = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "You are logged out successfully" });
  });
};

const editPasswordController = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const result = await updateUserPassword(userId, password);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Password changed for the user ID: ${userId}`);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    error(`Failed to change password: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const checkAuthController = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
  checkAuthController,
};
