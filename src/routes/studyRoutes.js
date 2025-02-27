import express from "express";
import { handleStudyRequest } from "../controllers/studyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log("Study route accessed:", req.method, req.url);
  next();
});

// Protect the study route
router.post("/", protect, handleStudyRequest);

export default router;
