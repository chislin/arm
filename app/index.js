var path = require('path');
var utils = require('./utils');
var mongoose = require('mongoose');

module.exports = function(app) {
    mongoose.connect('mongodb://lukichev:lukichev@ds023540.mlab.com:23540/arm_local');
    var db = mongoose.connection;
    db.once('open', function() {
        console.log(`Initialized db connection`);
    });

    utils
        .readdirRecursiveSync(path.join(__dirname, 'routes'))
        .forEach(function(route) {
            app.use(require(path.join(__dirname, 'routes', route)));
        });

    console.log('Initializing routes');
};