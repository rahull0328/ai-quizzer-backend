const Quiz = require("../models/Quiz");
const Submission = require("../models/Submission");
const { sendResultEmail } = require('../utils/emailer');
const { generateSuggestions } = require('../utils/suggestionGenerator');

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, email } = req.body; // include email in request
    const username = req.user?.username || 'guest';

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q) => {
      const userAnswer = answers.find(a => String(a.questionId) === String(q._id));
      if (userAnswer?.selectedOption === q.correctAnswer) score += 1;
    });

    const submission = new Submission({
      quizId,
      username,
      answers,
      score,
      type: req.originalUrl.includes('/retry') ? 'retry' : 'original'
    });

    await submission.save();

    // Email generation for suggestion
    if (email) {
      const suggestions = await generateSuggestions(quiz.subject, score, quiz.maxScore);
      const emailBody = `
        <h3>Your Quiz Results</h3>
        <p><b>Subject:</b> ${quiz.subject}</p>
        <p><b>Score:</b> ${score}/${quiz.maxScore}</p>
        <h4>Suggestions:</h4>
        <ul>
          <li>${suggestions[0]}</li>
          <li>${suggestions[1]}</li>
        </ul>
      `;
      await sendResultEmail(email, "Your Quiz Results", emailBody);
    }

    res.status(200).json({
      message: 'Quiz submitted successfully',
      score,
      maxScore: quiz.maxScore
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
