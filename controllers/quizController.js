const Quiz = require('../models/Quiz');
const { generateAIQuestions } = require('../utils/aiQuestionGenerator');

exports.createQuiz = async (req, res) => {
  try {
    const { grade, subject, totalQuestions, maxScore, difficulty } = req.body;

    if (!grade || !subject || !totalQuestions || !maxScore || !difficulty) {
      return res.status(400).json({ message: 'All fields are required: grade, subject, totalQuestions, maxScore, difficulty' });
    }

    //calling the api for generation of questions
    const questions = await generateAIQuestions(grade, subject, totalQuestions, difficulty);

    const quiz = new Quiz({ grade, subject, totalQuestions, maxScore, difficulty, questions });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};