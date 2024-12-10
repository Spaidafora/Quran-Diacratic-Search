const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); 
const quizController = require('../controllers/quizController');



router.get('/search', searchController.searchWords);

router.get('/quiz', quizController.getQuizQuestions)


router.get('/get-score', quizController.getScore);  // get => db
router.post('/update-score', quizController.getScore);  // post => send back / update 


module.exports = router;
