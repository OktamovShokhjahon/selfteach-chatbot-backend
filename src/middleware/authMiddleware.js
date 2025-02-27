import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  console.log("Auth middleware - headers:", req.headers);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found:", token);

      // Verify token using environment variable
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    } catch (error) {
      console.log("Auth error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
