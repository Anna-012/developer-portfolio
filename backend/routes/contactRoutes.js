import express from "express";

import {
  getContact,
  createContact,
  updateContact,
  sendContactEmail,
} from "../controllers/contactController.js";

const router = express.Router();

// Get contact information
router.get("/", getContact);

// Create contact information
router.post("/", createContact);

// Update contact information
router.put("/", updateContact);

// Send email from portfolio contact form
router.post("/send-email", sendContactEmail);

export default router;
