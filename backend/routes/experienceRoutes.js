import express from "express";

import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

// Get all experiences
router.get("/", getExperiences);

// Add experience
router.post("/", addExperience);

// Update experience
router.put("/:id", updateExperience);

// Delete experience
router.delete("/:id", deleteExperience);

export default router;
