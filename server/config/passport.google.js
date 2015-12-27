var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../features/users/user.server.model');
var googleAuth = require('./googleAuth/googleAuthKeys');

module.exports = function (passport) {
    
    // SERIALIZE USER //
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // GOOGLE PASSPORT STRATEGY //
    passport.use(new GoogleStrategy({
        clientID: googleAuth.googleAuth.clientID,
        clientSecret: googleAuth.googleAuth.clientSecret,
        callbackURL: googleAuth.googleAuth.callbackURL
    }, function (req, accessToken, refreshToken, profile, done) {

        User.findOne({ 'googleId': profile.id }, function (err, user) {
            if (user) {
                profile._json.image.url = profile._json.image.url.replace('?sz=50', '');
                console.log('Google user found in db');
                if (user.img !== profile._json.image.url) {
                    user.img = profile._json.image.url;
                }
                user.save();
                done(null, user);
            } else {
                console.log('Google user not found in db');
                user = new User()
                user.googleId = profile.id;
                user.name = profile.displayName;
                user.img = profile._json.image.url;
                user.email = profile.emails[0].value;
                // edit img url to not be just 50px //
                user.img = user.img.replace('?sz=50', '');
                console.log('New user created: ', user);

                user.save();
                done(null, user);
            }
        });
    }));
};