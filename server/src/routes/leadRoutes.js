import express from "express";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  assignLead,
  updateLeadStatus,
  getRecentLeads,
  getMyLeads,
  convertLeadToCustomer,
} from "../controllers/leadController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createLead);
router.get("/", isAuthenticated, getAllLeads);
router.get("/recent", isAuthenticated, getRecentLeads);
router.get("/my-leads", isAuthenticated, getMyLeads);
router.get("/:id", isAuthenticated, getLeadById);
router.post("/:id/convert", isAuthenticated, convertLeadToCustomer);
router.put("/:id", isAuthenticated, updateLead);
router.delete("/:id", isAuthenticated, deleteLead);
router.put("/:id/assign", isAuthenticated, assignLead);
router.put("/:id/status", isAuthenticated, updateLeadStatus);
export default router;