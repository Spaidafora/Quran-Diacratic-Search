// requirments 
// npm install express express-session passport ejs passport-google-oauth20 sqlite3

//  npm install nodemon --save-dev



const express = require("express");                         // main framework, used to create web server
const session = require("express-session");                // user data, storing temp data, etc.
const passport = require("./services/passport");                     // middleware for handling OAuth 

//const registerRoute = require("./routes/register");    // import the register routes!! 
const { users } = require ('./services/database');      // storing user info
const googleAuthRoute = require('./routes/googleAuth'); // google auth route

const app = express()    // intialize express

// Middleware setup
app.use(express.json()) // config express to take json data from client (postman testing, parsing middleware)

app.use(session({    // session middleware
    secret: '5523', // secret password
    resave: false, // won't resave unchanged sessions 
    saveUninitialized: false // won't save empty sessions.
}))



// passport middleware 
app.use(passport.initialize())   // passport ready for us (initialized)
app.use(passport.session())     // links session mangement with passport for authentication 

// Google auth
app.use('/', googleAuthRoute);

// static file serving from /public (like css, script.js)
app.use(express.static(__dirname + '/public'));   // Serve static files from the 'public' directory



// / templeting engine setup (EJS)
app.set('view engine', 'ejs')  




// root routes (homepage, register)

app.get('/', (req, res) => {                         // renders index.ejs found in /views 
    console.log("Success")
    res.render('index', {user: req.user});          // need ejs to display due to view engine rules?
})


app.get('/login', (req, res) => {
    res.render('login');        // render login.ejs
});



// start server 
app.listen(3000, () => {
    console.log("Server is running, @ port 3000")
});


