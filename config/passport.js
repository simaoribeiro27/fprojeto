// var mongojs = require('mongojs');
// var db = mongojs('mongodb://alfa:alfa1963@ds159880.mlab.com:59880/bdviagens', ['users']);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// load up the user model
var keystone = require('keystone');
var User = keystone.list('User');
// var User = require('../models/User');
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // passport session setup ==================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // GOOGLE ==================================================================
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                // User.module.findOne({ idg: profile.id }, function(err, user) {
                User.Schema.findOne({ idg: profile.id }, function(err, user) {
                    if (err) { return done(err); }
                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();
                        // set all of the relevant information
                        newUser.idg = profile.id;
                        newUser.token = token;
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value; // pull the first email
                        // save the user
                        newUser.save(function(err) {
                            if (err) { throw err; }
                            return done(null, newUser);
                        });
                    }
                });

            });
        }));
};