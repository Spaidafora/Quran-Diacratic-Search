const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { users } = require('./database');

// config google strategy 
passport.use(new GoogleStrategy({
    clientID: '825540349812-r5q5g5dtq8m4asi2lvq77oimba8lhr7p.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try{ // check if user exists in db
        const user = await users.findOne({googleId: profile.id})
        if(user){
            return done(null, user);
        }

    // create new user if user doesnt exist 
    const newUser = await users.insert({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
    })
    done(null, newUser)
} catch (error) {
        return done(error);
    }

}))

// Serialize user ID into the session
passport.serializeUser((user, done) => {
    done(null, user._id);
})

// Deserialize user ID from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await users.findOne({ _id: id });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
