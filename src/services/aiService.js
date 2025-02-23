import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function generateAIResponse(prompt) {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}
