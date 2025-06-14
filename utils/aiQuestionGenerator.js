const axios = require("axios");

async function generateAIQuestions(grade, subject, totalQuestions, difficulty) {
  const prompt = `
Generate ${totalQuestions} multiple-choice questions for grade ${grade} students in the subject "${subject}" with "${difficulty}" difficulty.
Each question should include:
- "questionText": A full question string.
- "options": An array of 4 answer choices as strings (not just "A", "B", etc).
- "correctAnswer": The full text (not just the letter) of the correct option from the "options" array.

Return a JSON array like:
[
  {
    "questionText": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "correctAnswer": "Paris"
  }
]
ONLY return valid JSON. No explanations.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices[0].message.content;

  // In case it's returned as a code block or string
  const jsonStart = content.indexOf("[");
  const jsonEnd = content.lastIndexOf("]");
  const jsonString = content.slice(jsonStart, jsonEnd + 1);

  return JSON.parse(jsonString);
}

module.exports = { generateAIQuestions };
