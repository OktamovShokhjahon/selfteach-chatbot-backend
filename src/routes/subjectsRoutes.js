import express from "express";
import auth from "../middleware/auth.js";
import Subject from "../models/Subject.js";

const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single subject
router.get("/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create subject (protected route)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSubject = new Subject({
      name,
      description,
    });
    const subject = await newSubject.save();
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update subject (protected route)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete subject (protected route)
router.delete("/:id", auth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
