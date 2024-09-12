// server/routes/categoryRoutes.js
import express from "express";
import { getAll } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/getAll", getAll); // Get all categories

export default router;
