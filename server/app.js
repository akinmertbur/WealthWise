// server/app.js
import express from "express";
import { connectDB } from "./data/database/dbConfig.js";
import { configureMiddleware } from "./middleware.js";
import { configureRoutes } from "./routes.js";
import dotenv from "dotenv";
import { log } from "./utils/logger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware
configureMiddleware(app);

// Configure routes
configureRoutes(app);

// Database connection
connectDB();

// Start server
app.listen(port, () => log(`Server running on port ${port}`));
