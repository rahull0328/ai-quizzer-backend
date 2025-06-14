const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String
});

const QuizSchema = new mongoose.Schema({
  grade: Number,
  subject: String,
  totalQuestions: Number,
  maxScore: Number,
  difficulty: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD']
  },
  questions: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);