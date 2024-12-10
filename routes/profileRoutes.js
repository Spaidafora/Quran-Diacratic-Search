const router = require('express').Router(); 

const passport = require("../services/passport/passport");



router.get('/profile', async (req, res) => {
    try{
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/login'); 
            
        }

        const user= req.user; //passport 
        console.log(req.user.displayName); 
        res.render('profile', {user: req.user}); // render to profile ejs 
    } catch (err){
        console.error(err); 
        res.status(500).send('idk man im tired'); 

    }

});


module.exports = router; 
