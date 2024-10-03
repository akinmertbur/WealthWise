// server/routes.js
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

export const configureRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/transaction", transactionRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/summary", summaryRoutes);
  app.use("/api/goal", goalRoutes);
  app.use("/api/budget", budgetRoutes);
  app.use("/api/report", reportRoutes);
};
