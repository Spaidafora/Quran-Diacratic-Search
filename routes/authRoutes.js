
const router = require('express').Router()
const passport = require('passport');



// auth login
router.get('/login',(req, res) => {
    res.render('login'); 
});

// logout

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err){
            return next(err);
        }
        console.log('User active (did login work?):', req.user);
        res.redirect('/');
    });
});


// auth with google
router.get('/google', passport.authenticate('google', {
    // what we want to retrieve from the profile 
    scope: ['profile', 'email']
})); 


//callback route for google redirect too 

router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/login' // if fail, redirect to login pg
}), (req, res) => {
    res.redirect('/'); // redirect to homepage
    console.log('User active (did login work?):', req.user);
});


module.exports = router; 