var Token = require('../models/token');

module.exports = function authenticateMiddlewareGenerator() {
    return function authenticate(req, res, next) {

        var models = res.app.get('models'),
            config = res.app.get('config'),
            token;

        if (!req.headers.authentication) {
            console.error('no token provided');
            return res.status(403).send({ 'error' : 'Authentication is required.' });
        }


        Token
            .find({ hash : req.headers.authentication })
            .then(function(token){
                console.log(token);
                next();
            });
    }
};