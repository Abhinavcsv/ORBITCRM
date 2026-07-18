import express from "express";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createCustomer);

router.get("/", isAuthenticated, getCustomers);

router.get("/:id", isAuthenticated, getCustomerById);

router.put("/:id", isAuthenticated, updateCustomer);

router.delete("/:id", isAuthenticated, deleteCustomer);

export default router;