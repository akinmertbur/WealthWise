// server/routes.js
import authRoutes from "./routes/authRoutes.js";

export const configureRoutes = (app) => {
  app.use("/api/auth", authRoutes);
};
