import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
} from "../controllers/taskController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createTask);
router.get("/", isAuthenticated, getTasks);
router.get("/my-tasks", isAuthenticated, getMyTasks);
router.get("/:id", isAuthenticated, getTaskById);
router.put("/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);

export default router;