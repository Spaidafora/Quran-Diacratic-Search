
const router = require('express').Router()
const passport = require('passport');



// auth login
router.get('/login',(req, res) => {
    res.render('login'); 
});

// logout

router.get('logout', (res, req) =>{
    res.send('logging out'); 
})


// auth with google
router.get('/google', passport.authenticate('google', {
    // what we want to retrieve from the profile 
    scope: ['profile']
})); 


//callback route for google redirect too 
//FIX
router.get('/google/redirect', passport.authenticate('google'), (req,res) => { // will take code {@url} and exchange for profile info
 res.send('You reached the callback URI')
});

module.exports = router; 