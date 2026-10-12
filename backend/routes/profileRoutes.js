import express from "express";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile);
router.post("/image", upload.single("image"), uploadProfileImage);

export default router;
