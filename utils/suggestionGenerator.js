const axios = require("axios");

async function generateSuggestions(subject, score, maxScore) {
  const prompt = `
A student has completed a ${subject} quiz and scored ${score} out of ${maxScore}.
Based on this, provide 2 short actionable suggestions (max 20 words each) to help them improve in ${subject}.
Return as JSON array like:
["Suggestion 1", "Suggestion 2"]
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

  const content = response.data.choices[0].message.content;
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  return JSON.parse(content.slice(start, end + 1));
}

module.exports = { generateSuggestions };
