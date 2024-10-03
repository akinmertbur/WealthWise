// server/routes/reportRoutes.js
import express from "express";
import {
  addReport,
  editReport,
  deleteReport,
  getReportDetail,
  getAllReports,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/add", addReport);
router.put("/edit", editReport);
router.delete("/delete", deleteReport);
router.post("/getReport", getReportDetail);
router.post("/getAll", getAllReports);

export default router;
