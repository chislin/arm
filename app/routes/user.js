var router = require('express')();
var User = require('../models/user');
var Token = require('../models/token');

var authenticate = require('../middlewares/auth');

router.post('/signup', function (req, res, next) {
    console.log('here');

    var user;

    User
        .findOne({ username: req.body.username })
        .then(function (result) {
            if (result) {
                throw new Error('User already exists');
            }

            user = new User({
                username: req.body.username,
                password: req.body.password
            });

            return user.save();
        })
        .then(function(user) {
            var token = new Token({ user_id: user._id });

            return token.save();
        })
        .then(function(token) {
            res.send({
                user: user,
                token: token
            })
        })
        .catch(next);
});

router.get('/user/:id',  authenticate(), function (req, res, next) {
    User
        .findOne({'_id': req.params.id})
        .exec()
        .then(function (user) {
            if (err) return handleError(err);
            if (user) {
                res.status(200).json(user);
            }
        });
});

router.put('/user/:id', authenticate(), function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, user) {
        if (err) return handleError(err);
        if (user) {
            res.status(200).json(user);
        }
    });
});

router.delete('/user/:id', authenticate(), function (req, res, next) {
    User
        .remove({_id: req.params.id})
        .exec()
        .then(function (result) {
            res.send(200).send(result)
        });
});


router.post('/login', function (req, res, next) {
    User
        .findOne({ username: req.body.username })
        .then(function (result) {
            var user = result;

            if (!user) {
                throw new Error('User not found.');
            }

            user.comparePassword(req.body.password, function (isMatch) {
                if (!isMatch) {
                    return res.status(401).send({message: 'Invalid email and/or password'});
                }

                var token = new Token({ user_id : user._id });

                return token.save(function(){
                    res.status(200).send({
                        user: user,
                        token: token
                    })
                });
            })
        })
        .catch(next);
});

router.post('/logout', function (req, res, next) {
    Token
        .remove({ hash : req.headers.authentication })
        .then(function () {
            res.status(200).send({ 'message' : 'Successfully logout.'})
        })
        .catch(next);
});

module.exports = router;
