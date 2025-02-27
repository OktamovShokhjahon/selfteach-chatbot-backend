import ChatHistory from "../models/chatHistoryModel.js";

// Get chat histories by subject
export const getChatHistoriesBySubject = async (req, res) => {
  try {
    const chatHistories = await ChatHistory.find({
      user: req.user._id,
      subject: req.params.subjectId,
    })
      .populate("subject", "name")
      .populate("topic", "name")
      .sort({ createdAt: -1 });

    res.json(chatHistories);
  } catch (error) {
    console.error("Error in getChatHistoriesBySubject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get chat histories by topic
export const getChatHistoriesByTopic = async (req, res) => {
  try {
    const chatHistories = await ChatHistory.find({
      user: req.user._id,
      topic: req.params.topicId,
    })
      .populate("subject", "name")
      .populate("topic", "name")
      .sort({ createdAt: -1 });

    res.json(chatHistories);
  } catch (error) {
    console.error("Error in getChatHistoriesByTopic:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get chat histories by command
export const getChatHistoriesByCommand = async (req, res) => {
  try {
    const chatHistories = await ChatHistory.find({
      user: req.user._id,
      command: req.params.command,
    })
      .populate("subject", "name")
      .populate("topic", "name")
      .sort({ createdAt: -1 });

    res.json(chatHistories);
  } catch (error) {
    console.error("Error in getChatHistoriesByCommand:", error);
    res.status(500).json({ message: "Server error" });
  }
};
