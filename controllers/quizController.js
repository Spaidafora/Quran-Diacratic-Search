const pool = require('../config/database');

const getQuizQuestions = async (req, res) => {
    try {
        console.log('Fetching quiz question...');
        
        // query to fetch a random single quiz question/answer pair 
        const questionResult = await pool.query(
            'SELECT arabic_text, english_text FROM quran_words ORDER BY RANDOM() LIMIT 1;'
        );
        const quizQuestion = questionResult.rows[0].arabic_text; // singles
        const correctAnswer = questionResult.rows[0].english_text;

        // query to fetch 3 multiple choice english_text != answer
        const incorrectOptions = await pool.query(
            'SELECT english_text FROM quran_words WHERE english_text != $1 ORDER BY RANDOM() LIMIT 3;',
            [correctAnswer]
        ); // mapped into [wrongOptions, correctAnswer] = [[array wrong options], correctAnswer ] 
        const wrongOptions = incorrectOptions.rows.map(row => row.english_text);
        
        // combine correct answer with wrongOptions and shuffle it into a nested array
        const options = [correctAnswer, wrongOptions].sort(() => Math.random() - 0.5);

        // json 
        res.json({
            message: 'Quiz API endpoint ready, here is a quiz question',
            question: quizQuestion,
            answer: correctAnswer,
            options: options
        });
       //console.log('wrongOptions: ', wrongOptions); 
    } catch (error) {
        console.error('Error fetching quiz question:', error);
        res.status(500).json({error: error.message });
    }
};

console.log('Example results test')

// api fetch test
fetch('http://localhost:3000/api/quiz')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching quiz API:', error));



module.exports = { getQuizQuestions };
