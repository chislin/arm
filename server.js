// Libraries
var express = require('express');
var bodyParser = require('body-parser');

var server = express();

server.set('port', (process.env.PORT || 3000));
server.set('x-powered-by', false);

var config = require('./app/config');

server.use(function(req, res, next){
    console.log(`[${req.method}] ${req.url}`);
    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.use(express.static(`${__dirname}/dist`));
server.get([
    '/',
    '/auth',
    '/main',
    '/403',
    '/404',
    '/500'
], function(req, res) {
    res.sendFile(`${__dirname}/dist/index.html`);
});

require('./app')(server);

server.use(function(req, res, next) {
    console.log(`UNRESOLVED: [${req.method}] ${req.headers.host}${req.url}`);
    next();
});

server.use(function (err, req, res, next) {
    res.status(500).send(err.message)
});

server.listen(server.get('port'), function () {
    console.log(`Server listening on port ${server.get('port')}`);
});

module.exports = server;