import express from "express";

import {
  getContact,
  createContact,
  updateContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Get contact information
router.get("/", getContact);

// Create contact information
router.post("/", createContact);

// Update contact information
router.put("/", updateContact);

export default router;
