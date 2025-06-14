const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  selectedOption: String
});

const SubmissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  username: String,
  answers: [AnswerSchema],
  score: Number,
  type: {
    type: String,
    enum: ['original', 'retry'],
    default: 'original'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
