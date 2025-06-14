const axios = require("axios");

async function generateHint(questionText) {
  const prompt = `
Give a helpful hint for the following question without giving away the answer.

Question: "${questionText}"

Hint: (1 sentence, max 20 words)
`;

  const response = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  }, {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  return response.data.choices[0].message.content.trim();
}

module.exports = { generateHint };
