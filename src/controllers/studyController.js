import { generateAIResponse } from "../services/aiService.js";
import { generatePrompt } from "../utils/promptGenerator.js";

export async function handleStudyRequest(req, res) {
  const { subject, question, mainCommand } = req.body;

  try {
    const prompt = generatePrompt(subject, question, mainCommand);
    const answer = await generateAIResponse(prompt);
    res.json({ answer });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}
