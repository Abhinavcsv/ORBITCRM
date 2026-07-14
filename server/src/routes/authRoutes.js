import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  verifyOTP,
  resetPassword
} from "../controllers/authController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logout);

router.get("/me", isAuthenticated, getCurrentUser);

export default router;