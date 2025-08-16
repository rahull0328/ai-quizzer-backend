const Quiz = require('../models/Quiz');
const { generateHint } = require('../utils/hintGenerator');

exports.getHints = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const results = [];

    for (const question of quiz.questions) {
      const hint = await generateHint(question.questionText);
      results.push({
        questionText: question.questionText,
        options: question.options,
        hint
      });
    }

    res.status(200).json({ quizId, hints: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate hints' });
  }
};
