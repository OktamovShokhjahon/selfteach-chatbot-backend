import ChatHistory from "../models/chatHistoryModel.js";
import jwt from "jsonwebtoken";

// @desc    Create new chat history
// @route   POST /api/chat-history
// @access  Private
export const createChatHistory = async (req, res) => {
  try {
    const { title, messages } = req.body;

    const chatHistory = await ChatHistory.create({
      user: req.user._id,
      title,
      messages,
    });

    res.status(201).json(chatHistory);
  } catch (error) {
    console.error("Error in createChatHistory1:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all chat histories for a user
// @route   GET /api/chat-history
// @access  Private
export const getChatHistories = async (req, res) => {
  console.log("Getting chat histories for user:", req.user._id);

  console.log(req.user);

  try {
    const chatHistories = await ChatHistory.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    console.log("Found chat histories:", chatHistories);
    res.json(chatHistories);
  } catch (error) {
    console.error("Error in getChatHistories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single chat history by ID
// @route   GET /api/chat-history/:id
// @access  Private
export const getChatHistoryById = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chatHistory) {
      return res.status(404).json({ message: "Chat history not found" });
    }

    res.json(chatHistory);
  } catch (error) {
    console.error("Error in getChatHistoryById:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update chat history
// @route   PUT /api/chat-history/:id
// @access  Private
export const updateChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chatHistory) {
      return res.status(404).json({ message: "Chat history not found" });
    }

    const { messages, title } = req.body;

    chatHistory.messages = messages || chatHistory.messages;
    chatHistory.title = title || chatHistory.title;

    const updatedChatHistory = await chatHistory.save();
    res.json(updatedChatHistory);
  } catch (error) {
    console.error("Error in updateChatHistory:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete chat history
// @route   DELETE /api/chat-history/:id
// @access  Private
export const deleteChatHistory = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chatHistory) {
      return res.status(404).json({ message: "Chat history not found" });
    }

    await chatHistory.deleteOne();
    res.json({ message: "Chat history removed" });
  } catch (error) {
    console.error("Error in deleteChatHistory:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Clear all chat histories for a user
// @route   DELETE /api/chat-history/clear-all
// @access  Private
export const clearAllHistory = async (req, res) => {
  try {
    console.log("Clearing all chat histories for user:", req.user._id);

    // Delete all chat histories for the user
    const result = await ChatHistory.deleteMany({ user: req.user._id });

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No chat histories found" });
    }

    res.json({
      message: "All chat histories cleared successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error in clearAllHistory:", error);
    res.status(500).json({ message: "Server error" });
  }
};
