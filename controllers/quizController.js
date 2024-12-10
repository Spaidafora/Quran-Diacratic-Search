const pool = require('../config/database');

const getQuizQuestions = async (req, res) => {
    try {
       // console.log('Fetching quiz question...');
        
        // query to fetch a random single quiz question/answer pair 
        const questionResult = await pool.query(
            'SELECT arabic_text, english_text FROM quran_words ORDER BY RANDOM() LIMIT 1;'
        );
        const quizQuestion = questionResult.rows[0].arabic_text; // first row, arabic col
        const correctAnswer = questionResult.rows[0].english_text;

        // query to fetch 3 multiple choice english_text != answer
        const incorrectOptions = await pool.query(
            `SELECT english_text FROM quran_words WHERE english_text != '${correctAnswer}' ORDER BY RANDOM() LIMIT 3;`
        );

        console.log(incorrectOptions); //before
        
         // array of objects => mapped to single array of english values 
        const wrongOptions = incorrectOptions.rows.map(row => row.english_text);
        
        console.log(wrongOptions);  // after
        // combine correct answer with wrong using spread (...)-- so not nested and shuffle it 
        const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

        console.log({
            message: 'Quiz API endpoint ready, here is a quiz question',
            question: quizQuestion,
            answer: correctAnswer,
            options: options
        });
        
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

const getScore = async (req, res) => {
    try{ 
        const userEmail = req.user.email;  // google auth sess , passport.js
        const userScore = await pool.query (
            'SELECT score from users WHERE email = $1', [userEmail] /// parameterized query
        ); 
        res.json({
            success: 'true',
            score: userScore.rows[0].score // first row, col @ score
        }); 

        }catch (error) {
        console.error("Error trying to get score", error)
        res.json({error: 'failed to get score from db'}) // internal server err

    }
};


const updateScore = async (req, res) => {
    try{ 
        if (!req.user){
            return res.status(401).json({error: 'You must log in to have/update score'}); 
        }
        const userEmail = req.user.email;
        const { updatedScore } = req.body; // get from frontend

        await pool.query(
            'UPDATE users SET score = $1 WHERE email = $2', [updatedScore, userEmail] // set new score
        ); 

        // get and return the new updated score for frontend

        const result = await pool.query(
            'SELECT score from users WHERE email = $1', [userEmail]
        ); 

        res.json(
            { score: result.rows[0].score }  ); // new score val
         } catch (error) {
            res.json({error: 'failed to update score'}) 
         }
}

console.log('Example results test')

// api fetch test
fetch('http://localhost:3000/api/quiz')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching quiz API:', error));





module.exports = { getQuizQuestions,
                    getScore,
                    updateScore
 };
