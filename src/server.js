import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
