import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Route to decode token and get user data
router.post("/decode", async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Received token:", token);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Get user data
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userData: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
      tokenData: decoded,
    });
  } catch (error) {
    console.error("Token decode error:", error);
    // res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
