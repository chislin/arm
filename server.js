// Libs
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var md5 = require('md5');

var server = express();

mongoose.connect('mongodb://chislin:chislin@ds011890.mlab.com:11890/arm-database');
var db = mongoose.connection;
db.once('open', function() {
    console.log(`Initialized db connection`);
});

server.set('port', (3000));
server.set('x-powered-by', false);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req, res, next){
    console.log(`[${req.method}] ${req.url}`);
    next();
});

server.use(express.static(`${__dirname}/`));
server.get([
    '/',
    '/main',
    '/second' 
], function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
});

server.use(function(req, res, next) {
    console.log(`UNRESOLVED: [${req.method}] ${req.headers.host}${req.url}`);
    next();
});

server.listen(server.get('port'), function () {
    console.log(`Server listening on port ${server.get('port')}`);
    console.log('Environment is ' + server.get('env'));
});


// Models
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    first_name: String,
    last_name : String,
    class : String,
    password: { 
        type: String, 
        select: false, 
        validate: [
            function(password){
                return password.length >= 6
            }
        ]
    }
});

var User = mongoose.model('User', userSchema);

server.post('/user', function(req, res, next){
    var user = req.body;
    user.password = md5(user.password);

    var user = new User(req.body);

    user.save(function (err) {
      if (err) return console.log(err);
    }) 

    res.status(200).json(user)
}); 


server.get('/user/:id', function(req, res, next){
    User.findOne({ '_id': req.params.id }, function (err, user) {
      if (err) return handleError(err);
      if (user) {
        res.status(200).json(user);
      }
    });
});

server.put('/user/:id', function(){

});

server.delete('/user/:id', function(){
 
});