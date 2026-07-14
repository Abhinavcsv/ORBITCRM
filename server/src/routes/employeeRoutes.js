import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createEmployee);
router.put("/:id", isAuthenticated, updateEmployee);
router.get("/", isAuthenticated, getAllEmployees);
router.get("/:id", isAuthenticated, getEmployeeById);
router.delete("/:id", isAuthenticated, deleteEmployee);
export default router;