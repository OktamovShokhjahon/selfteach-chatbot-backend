const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Add auth middleware to protect the route
router.post("/", auth, async (req, res) => {
  try {
    // ... existing AI processing code ...

    // After getting AI response, save to user's chat history
    const user = await User.findById(req.userId);
    user.userChatHistory.push({
      question: req.body.question,
      answer: aiResponse,
    });
    await user.save();

    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's chat history
router.get("/history", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.userChatHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
