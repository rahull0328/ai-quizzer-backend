const express = require('express');
const router = express.Router();
const { createQuiz } = require('../controllers/quizController');
const { submitQuiz } = require('../controllers/submissionController');
const verifyToken = require('../middleware/auth');
const { getQuizHistory } = require('../controllers/historyController');
const { getHints } = require('../controllers/hintController');

router.post('/', verifyToken, createQuiz);
router.post('/:quizId/submit', verifyToken, submitQuiz);

//quiz filter and history route
router.get('/history', verifyToken, getQuizHistory)

//retrying the quiz route
router.post('/:quizId/retry', verifyToken, submitQuiz);

//hints route
router.get('/:quizId/hints', verifyToken, getHints);

module.exports = router;