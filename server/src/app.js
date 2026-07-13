import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import testRoutes from "./routes/testRoutes.js";

import sessionMiddleware from "./config/session.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/test", testRoutes);
app.use(sessionMiddleware);

app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 OrbitCRM Backend is Running Successfully!",
  });
});

export default app;