const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config({ path: '../.env' });

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email.toLowerCase() }, (err, user) => {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, { msg: `Email ${email} not found.` })
                }
                if (!user.password) {
                    return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
                }
                user.comparePassword(password, (err, isMatch) => {
                    if (err) { return done(err) }
                    if (isMatch) {
                        console.log("User authenticated (LocalStrategy):", user);
                        return done(null, user);
                    }
                    return done(null, false, { msg: 'Invalid email or password.' })
                })
            })
        }))
    passport.serializeUser((user, done) => {
        // console.log('Serialized user:', user); check
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                // console.log('Deserialized user:', user);
            }
            done(err, user);
        });
    });
}

/*
    // Set up Google OAuth 2.0 authentication strategy
    passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "http://localhost:7778/auth/google/callback",
        passReqToCallback: true,
        scope: ['profile', 'email']
    }, function (request, accessToken, refreshToken, profile, done) {
        // Here, you can retrieve the user's profile data from the `profile` object
        // and use it to authenticate or create a user account in your application.
        // The `done` function should be called with the user object when authentication is successful.
        User.findOne({ googleId: profile.id }, function (err, user) {
            if (err) { return done(err); }
            if (user) { return done(null, user); }
            else {
                const newUser = new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.email
                });
                newUser.save(function (err) {
                    if (err) { return done(err); }
                    return done(null, newUser);
                });
            }
        });
    }));
*/

