import express from "express";
import {
  createChatHistory,
  getChatHistories,
  getChatHistoryById,
  updateChatHistory,
  deleteChatHistory,
} from "../controllers/chatHistoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getChatHistories).post(createChatHistory);

router
  .route("/:id")
  .get(getChatHistoryById)
  .put(updateChatHistory)
  .delete(deleteChatHistory);

export default router;
