import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
dotenv.config();

// routes
import studyRoutes from "./routes/studyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import chatHistoryRoutes from "./routes/chatHistoryRoutes.js";

// app
const app = express();
app.use(express.json());
app.use(cors());

// mongoose
connectDB();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Routes
app.use("/api/study", studyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat-history", chatHistoryRoutes);

app.get("/protected", protect, (req, res) => {
  res.json({ message: "Protected route" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
