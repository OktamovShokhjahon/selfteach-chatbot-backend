export function generatePrompt(subject, question, mainCommand) {
  switch (mainCommand) {
    case "explain":
      return `As a tutor, help me understand this ${subject} concept: ${question}.
              Provide a detailed explanation and break down the concepts into simpler terms. send response in uzbek language`;
    case "solve":
      return `As a tutor, help me solve this ${subject} question: ${question}.
              Provide a step-by-step solution with detailed explanations. send response in uzbek language`;
    case "analyze":
      return `Please analyze this ${subject} topic: ${question}.
              Provide a thorough analysis with key points and implications. send response in uzbek language`;
    case "compare":
      return `Compare and contrast the different aspects of this ${subject} topic: ${question}.
              Highlight similarities and differences in detail. send response in uzbek language`;
    case "summarize":
      return `Provide a comprehensive summary of this ${subject} topic: ${question}.
              Include main points and key takeaways. send response in uzbek language`;
    case "other":
      return `As a tutor, help me with this ${subject} question: ${question}.
              Provide a detailed explanation and thorough analysis. send response in uzbek language`;
    default:
      return `As a tutor, help me with this ${subject} question: ${question}.
              Provide a detailed explanation and break down the concepts. send response in uzbek language`;
  }
}
