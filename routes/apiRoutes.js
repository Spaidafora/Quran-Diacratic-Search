const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); 
const quizController = require('../controllers/quizController');



router.get('/search', searchController.searchWords);

router.get('/quiz', quizController.getQuizQuestions)

module.exports = router;
