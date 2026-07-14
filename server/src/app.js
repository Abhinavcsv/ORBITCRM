import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import sessionMiddleware from "./config/session.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session BEFORE routes
app.use(sessionMiddleware);

app.use(helmet());
app.use(morgan("dev"));

// ✅ Routes AFTER session
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 OrbitCRM Backend is Running Successfully!",
  });
});

export default app;