var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var session = require('express-session');
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
// Require keystone
var keystone = require('keystone');
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    'name': 'tripsCMS',
    'brand': 'tripsCMS',
    'sass': 'public',
    'less': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'jade',
    'google api key': process.env.GOOGLE_BROWSER_KEY,
    'google server api key': process.env.GOOGLE_SERVER_KEY,
    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable,
    google_api_key: keystone.get('google api key'),
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    posts: ['posts', 'post-categories'],
    enquiries: 'enquiries',
    users: 'users',
});
//
// required for passport
app.use(session({
    secret: 'alfa', // session secret
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
require('./config/passport')(passport);
//
// Start Keystone to connect to your database and initialise the web server
keystone.start();