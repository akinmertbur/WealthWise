// server/routes/reportRoutes.js
import express from "express";
import {
  addReport,
  deleteReport,
  getReportDetail,
  getAllReports,
} from "../controllers/reportController.js";
import {
  validateAddReport,
  validateDeleteReport,
  validateGetReportDetail,
  validateGetAllReports,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddReport, addReport);
router.delete("/delete", validateDeleteReport, deleteReport);
router.post("/getReport", validateGetReportDetail, getReportDetail);
router.post("/getAll", validateGetAllReports, getAllReports);

export default router;
