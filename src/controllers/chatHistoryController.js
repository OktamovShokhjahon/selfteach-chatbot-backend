import ChatHistory from "../models/chatHistoryModel.js";

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
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all chat histories for a user
// @route   GET /api/chat-history
// @access  Private
export const getChatHistories = async (req, res) => {
  try {
    const chatHistories = await ChatHistory.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(chatHistories);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(400).json({ message: error.message });
  }
};
