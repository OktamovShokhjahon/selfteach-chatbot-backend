import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

// routes
import studyRoutes from "./routes/studyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import chatHistoryRoutes from "./routes/chatHistoryRoutes.js";
import subjectsRoutes from "./routes/subjectsRoutes.js";
import topicsRoutes from "./routes/topicsRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import chatHistoryFilterRoutes from "./routes/chatHistoryFilterRoutes.js";
import commandRoutes from "./routes/commandRoutes.js";

// dirname/filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));

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

// Add a general middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/study", studyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat-history", chatHistoryRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/chat-history/filter", chatHistoryFilterRoutes);
app.use("/api/commands", commandRoutes);

app.get("/protected", protect, (req, res) => {
  res.json({ message: "Protected route" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
