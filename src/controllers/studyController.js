import { generateAIResponse } from "../services/aiService.js";
import { generatePrompt } from "../utils/promptGenerator.js";
import ChatHistory from "../models/chatHistoryModel.js";
import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";

export async function handleStudyRequest(req, res) {
  const { subject, question, mainCommand: commandId, realCommand } = req.body;

  console.log("subject", req.body);
  console.log("realCommand", realCommand);
  console.log("commandId", commandId);
  console.log("question", question);

  try {
    // Find subject and command details
    // const subject = await Subject.findById(subjectId);
    // console.log("subject", subject);
    // const command = await Topic.findById(commandId);

    // if (!subject || !command) {
    //   return res.status(404).json({ error: "Subject or command not found" });
    // }

    console.log("Study request received:", {
      subject,
      question,
      mainCommand: commandId,
    });

    const prompt = generatePrompt(subject, question, commandId);
    const answer = await generateAIResponse(prompt);

    if (req.user && req.user._id) {
      const chatHistory = await ChatHistory.create({
        user: req.user._id,
        messages: [
          {
            role: "user",
            content: question,
          },
          {
            role: "assistant",
            content: answer,
          },
        ],
        title: question,
        subject: subject,
        command: realCommand,
        topic: commandId,
      });
      console.log("Chat history saved:", chatHistory);
    }

    res.json({ answer });
  } catch (error) {
    console.error("Error processing study request:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}
