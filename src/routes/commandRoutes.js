import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTopicCommands,
  addCommand,
  updateCommand,
  deleteCommand,
} from "../controllers/commandController.js";

const router = express.Router();

// Add logging middleware
router.use((req, res, next) => {
  console.log("Command route accessed:", req.method, req.url);
  next();
});

// Command routes
router.get("/topic/:topicId", protect, getTopicCommands);
router.post("/topic/:topicId", protect, addCommand);
router.put("/topic/:topicId/:commandId", protect, updateCommand);
router.delete("/topic/:topicId/:commandId", protect, deleteCommand);

export default router;
