// server/app.js
import express from "express";
import { connectDB } from "./data/database/dbConfig.js";
import { configureMiddleware } from "./middleware.js";
import { configureRoutes } from "./routes.js";
import dotenv from "dotenv";
import { log } from "./utils/logger.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // The origin of your frontend
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Configure middleware
configureMiddleware(app);

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

// Serve static files from the "public" directory
app.use(express.static("public"));

// Configure routes
configureRoutes(app);

// Database connection
connectDB();

// Start server
app.listen(port, () => log(`Server running on port ${port}`));
