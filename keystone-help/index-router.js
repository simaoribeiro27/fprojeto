/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var express = require('express');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers

var routes = {
    views: importRoutes('./views'),
    api: importRoutes('../controllers/'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
    // Views
    app.get('/', routes.views.index);
    app.all('/contact', routes.views.contact);
    //app.get('/trips/:trip?', routes.views.trips);
    // app.get('/trips/moment/:moment', routes.views.moment);
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);


    /* app.get('/api/trip/list', keystone.initAPI, routes.api.trips.list);
     app.all('/api/trip/create', keystone.initAPI, routes.api.trips.create);
     app.get('/api/trip/:id', keystone.initAPI, routes.api.trips.get);
     app.all('/api/trip/:id/update', keystone.initAPI, routes.api.trips.update);
     app.get('/api/trip/:id/remove', keystone.initAPI, routes.api.trips.remove);

     app.get('/api/moment/list', keystone.initAPI, routes.api.moments.list);
     app.all('/api/moment/create', keystone.initAPI, routes.api.moments.create);
     app.get('/api/moment/:id', keystone.initAPI, routes.api.moments.get);
     app.all('/api/moment/:id/update', keystone.initAPI, routes.api.moments.update);
     app.get('/api/moment/:id/remove', keystone.initAPI, routes.api.moments.remove);*/
};

//express route
/* exports = module.exports = function(app) {
    if (process.env.NODE_ENV != 'prodution') {
        app.all('*', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET', 'moment');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
    }
    // our express routes
    var router = express.Router();
    // api
    router.route('/trips/:trip_id/moments')
        .get(routes.api.moment.getAll);
    router.route('/trips/:trip_id/moment/:moment_id')
        .get(routes.api.moment.getOne);
    router.route('/trips')
        .get(routes.api.trip.getAll);
    router.route('/trip/:trip_id')
        .get(routes.api.trip.getOne);

    // regiter all  with /api
    app.use('/api/v1', router);
};*/