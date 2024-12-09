
// npm install express express-session passport ejs passport-google-oauth20
//  npm install nodemon --save-dev

const express = require("express");                                
const session = require("express-session");                        
const passport = require("./services/passport/passport");       
const authRoutes = require('./routes/authRoutes')    
require('dotenv').config(); // env vars
const pool = require('./config/database'); 
const searchRoutes = require('./routes/apiRoutes');

 
const app = express()    

// view engine (EJS)
app.set('view engine', 'ejs')  

// reusing old code
// Middleware for sessions & passport (0Auth) , links session mangement w/ passport for authentication 

app.use(session({   
    secret: '5523', 
    resave: false, 
    saveUninitialized: false 
}))


app.use(passport.initialize())   
app.use(passport.session())     



// set up auth routes 
app.use('/auth', authRoutes); // [auth/ -> login, logout, google]


// search routes 
app.use('/api', searchRoutes);

// Route for /quiz
// Route for /quiz
app.get('/quiz', (req, res) => {
    res.render('quiz', { user: req.user }); // Pass user object if needed
});


// homepage route 
app.get('/', (req, res) => {
    res.render('index', {user: req.user}); 
})


app.use(express.static(__dirname + '/public'));



app.listen(3000, () => {
    console.log("Server is listening at port 3000")
});


