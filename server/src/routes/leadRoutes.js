import express from "express";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
   deleteLead,
    assignLead,
    updateLeadStatus
} from "../controllers/leadController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createLead);
router.get("/", isAuthenticated, getAllLeads);
router.get("/:id", isAuthenticated, getLeadById);
router.put("/:id", isAuthenticated, updateLead);
router.delete("/:id", isAuthenticated, deleteLead);
router.put("/:id/assign", isAuthenticated, assignLead);
router.put("/:id/status", isAuthenticated, updateLeadStatus);
export default router;