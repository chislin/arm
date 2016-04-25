var Token = require('../models/token');

module.exports = function authenticateMiddlewareGenerator() {
    return function authenticate(req, res, next) {

        var token;

        if (!req.headers.authentication) {
            console.error('no token provided');
            return res.status(403).send({ 'error' : 'Authentication is required.' });
        }


        Token
            .find({ hash : req.headers.authentication })
            .then(function(token){
                next();
            });
    }
};