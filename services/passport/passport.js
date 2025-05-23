// npm install passport passport-google-oauth20
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../../models/User'); //  User model



//test

console.log("test here: ")
console.log('Loaded User:', User); // Should log the User object
console.log('User methods:', Object.keys(User)); // Should show ['findByGoogleId', 'create']



// config google strategy 
passport.use(new GoogleStrategy({
    // options for google strategy 
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
}, 
async (accessToken, refreshToken, profile, done) => { 

    //test 

    console.log('Google profile: ', profile);
    console.log('Emails:', profile.emails);
    console.log('Photos: ', profile.photos );
    try {
        let user = await User.findByGoogleId(profile.id);
        if (user){
            console.log("You Exist Already!", user);
        } else {

            user = await User.create (
                profile.id,
                profile.displayName,
                profile.photos?.[0]?.value || null, 
                'google', //provider
                profile.emails?.[0]?.value || null // add what you want from Google profiles 
            );
            console.log('Thanks for joining', user);
        }
                                    
        done(null, user);

    }  catch (err) {
        console.error("Error with Google User Authentication, try again later!", err); 
        done(err, null);

    // passport callback function 
    console.log('passport callback function fired')
    console.log(profile); 
}}));




passport.serializeUser((user, done) =>{
    console.log('Serializing user: ', user.google_id);
    console.log('sterrialized user:', user);
    done(null, user.google_id); // req.user from session for saving sore! 
}); // passing user.id to done callback, no db op. #session

passport.deserializeUser(async (google_id, done) =>{
    try {
        const user = await User.findByGoogleId(google_id);
        console.log('Deserialized user:', user);
        done(null,user); // attach user object to req.user
    } catch (err){
        done(err, null)
    }
    }); // err to catch db or query issues 




module.exports = passport;
