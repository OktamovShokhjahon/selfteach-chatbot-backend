import express from "express";
import {
  createChatHistory,
  getChatHistories,
  getChatHistoryById,
  updateChatHistory,
  deleteChatHistory,
  clearAllHistory,
} from "../controllers/chatHistoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log("Chat history route accessed:", req.method, req.url);
  next();
});

router
  .route("/")
  .get(protect, getChatHistories)
  .post(protect, createChatHistory);

router.delete("/clear-all", protect, clearAllHistory);

router
  .route("/:id")
  .get(protect, getChatHistoryById)
  .put(protect, updateChatHistory)
  .delete(protect, deleteChatHistory);

// Add new route for clearing all history

export default router;
