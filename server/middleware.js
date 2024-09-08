// server/middleware.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configureMiddleware = (app) => {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Configure session management
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours (duration user stays logged in)
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // CORS setup
  app.use(
    cors({
      origin: "http://localhost:5173", // The origin of your frontend
      credentials: true, // Allow credentials (cookies) to be sent
    })
  );
};
