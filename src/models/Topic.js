import mongoose from "mongoose";

const commandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["tushuntir", "yech", "tahlil", "solishtir", "qisqacha"],
  },
  description: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: true,
  },
});

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  commands: [commandSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Topic", topicSchema);
