
// npm install express express-session passport ejs passport-google-oauth20
// npm install nodemon --save-dev

//required dependecies 
const express = require("express");                                
const session = require("express-session");                        
const passport = require("./services/passport/passport");       
const authRoutes = require('./routes/authRoutes')    
const searchRoutes = require('./routes/apiRoutes');
const profileRoute = require('./routes/profileRoutes');
const pool = require("./config/database");
// initialize express app first 
const app = express()   


//middleware setup 

//parse json for api requests 
app.use(express.json())
 

// view engine (EJS) for rendering pages 
app.set('view engine', 'ejs')  


// sessions config 

app.use(session({   
    secret: '5523', 
    resave: false, 
    saveUninitialized: false // dont create until something stores 
}))


// passport auth setup
app.use(passport.initialize())   
app.use(passport.session())     // pp w/ sessions 



// auth and api routes 
app.use('/auth', authRoutes); // (/auth/google , /auth/logout)
app.use('/api', searchRoutes); // (api/quiz, api/search, api/get-score)


// quiz route - renders quiz.ejs with user data
app.get('/quiz', (req, res) => {
    res.render('quiz', { user: req.user }); // Pass user object 
});




 
 



// home route - renders index w/ user info 
app.get('/', (req, res) => {
    res.render('index', {user: req.user}); 
})

// static files via public dir (never used)
app.use(express.static(__dirname + '/public'));

app.use('/', profileRoute); 

// start server
app.listen(3000, () => {
    console.log("Server is listening at port 3000")
});


