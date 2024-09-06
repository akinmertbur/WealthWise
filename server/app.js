// server/app.js
import express from "express";
import { connectDB } from "./data/database/dbConfig.js";
import { configureMiddleware } from "./middleware.js";
import { configureRoutes } from "./routes.js";
import dotenv from "dotenv";
import { log } from "./utils/logger.js";
import session from "express-session";
import passport from "passport";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
configureMiddleware(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
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
