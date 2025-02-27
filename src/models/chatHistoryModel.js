import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [
      {
        role: {
          type: String,
          required: true,
          enum: ["user", "assistant"],
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Topic",
      required: true,
    },
    command: {
      type: String,
      required: true,
      enum: ["tushuntir", "yech", "tahlil", "solishtir", "qisqacha"],
    },
  },
  {
    timestamps: true,
  }
);

const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);

export default ChatHistory;
