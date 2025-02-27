import express from "express";
import auth from "../middleware/auth.js";
import Topic from "../models/Topic.js";

const router = express.Router();

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find().populate("subject", "name");
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get topics by subject
router.get("/subject/:subjectId", async (req, res) => {
  try {
    const topics = await Topic.find({ subject: req.params.subjectId }).populate(
      "subject",
      "name"
    );
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single topic
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate(
      "subject",
      "name"
    );
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create topic (protected route)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, subject } = req.body;
    const newTopic = new Topic({
      name,
      description,
      subject,
    });
    const topic = await newTopic.save();
    await topic.populate("subject", "name");
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update topic (protected route)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description, subject } = req.body;
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { name, description, subject },
      { new: true }
    ).populate("subject", "name");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete topic (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
