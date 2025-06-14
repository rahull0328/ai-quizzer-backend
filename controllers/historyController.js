const Submission = require("../models/Submission");
const Quiz = require("../models/Quiz");

exports.getQuizHistory = async (req, res) => {
  try {
    const { grade, subject, from, to } = req.query;
    const username = req.user?.username;

    const filters = { username };

    if (from || to) {
      filters.submittedAt = {};
      if (from) filters.submittedAt.$gte = new Date(from);
      if (to) filters.submittedAt.$lte = new Date(to);
    }

    // Populate quiz data
    const submissions = await Submission.find(filters)
      .populate("quizId")
      .exec();

    const filtered = submissions
      .filter((sub) => {
        const quiz = sub.quizId;
        if (grade && quiz.grade !== parseInt(grade)) return false;
        if (subject && quiz.subject !== subject) return false;
        return true;
      })
      .map((sub) => ({
        subject: sub.quizId.subject,
        grade: sub.quizId.grade,
        difficulty: sub.quizId.difficulty,
        score: sub.score,
        maxScore: sub.quizId.maxScore,
        submittedAt: sub.submittedAt,
        type: sub.type,
      }));

    res.status(200).json({ count: filtered.length, submissions: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
