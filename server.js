
// npm install express express-session passport ejs passport-google-oauth20
//  npm install nodemon --save-dev

const express = require("express");                                
const session = require("express-session");                        
const passport = require("./services/passport/passport");       
const authRoutes = require('./routes/authRoutes')    
require('dotenv').config(); // env vars
const pool = require('./services/database/database'); 

 
const app = express()    

// view engine (EJS)
app.set('view engine', 'ejs')  





// set up auth routes 
app.use('/auth', authRoutes); // [auth/ -> login, logout, google]


// homepage route 
app.get('/', (req, res) => {
    res.render('index'); 
})


app.listen(3000, () => {
    console.log("Server is listening at port 3000")
});


