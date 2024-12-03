const express = require('express');
const passport = require('passport');

const router = express.Router();



// redirect to google from login!
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    //failureRedirect: '/'

}));

// google call back
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/'); // Redirect to home after successful login
});

//logout

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/'); // Redirect to the homepage
    });
});

module.exports = router; 