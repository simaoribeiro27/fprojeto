var keystone = require('keystone');
var Classification = keystone.list('Classification');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'classification';
    locals.classificationTypes = Classification.fields.classificationType.ops;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.classificationSubmitted = false;

    // On POST requests, add the Enquiry item to the database
    view.on('post', { action: 'classific' }, function(next) {

        var newClassification = new Classification.model();
        var updater = newClassification.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'classificationType',
            errorMessage: 'There was a problem submitting your classification:',
        }, function(err) {
            if (err) {
                locals.classificationSubmitted = true;

            }
            next();
        });
    });

    view.render('classification');
};