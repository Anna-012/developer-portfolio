import express from "express";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// Get all projects
router.get("/", getProjects);

// Add project
router.post("/", upload.single("image"), addProject);

// Update project
router.put("/:id", upload.single("image"), updateProject);

// Delete project
router.delete("/:id", deleteProject);

export default router;
