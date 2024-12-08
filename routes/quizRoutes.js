const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route to render the quiz page
router.get('/quiz', quizController.renderQuiz);

// Route to fetch quiz data
router.get('/api/quiz', quizController.getQuizData);

module.exports = router;
