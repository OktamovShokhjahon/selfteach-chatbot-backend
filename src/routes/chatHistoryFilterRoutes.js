import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getChatHistoriesBySubject,
  getChatHistoriesByTopic,
  getChatHistoriesByCommand,
} from "../controllers/chatHistoryFilterController.js";

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log("Chat history filter route accessed:", req.method, req.url);
  next();
});

// Filter routes
router.get("/subject/:subjectId", protect, getChatHistoriesBySubject);
router.get("/topic/:topicId", protect, getChatHistoriesByTopic);
router.get("/command/:command", protect, getChatHistoriesByCommand);

export default router;
