var Router = require('express').Router;

var User = require('../models/user');

module.exports = function (app) {
    app.post('/user/signup', function (req, res) {
        console.log('here');
        User.findOne({ username: req.body.username }, function (err, existingUser) {
            if (existingUser) {
                return res.status(409).send({message: 'Email is already taken'});
            }

            var user = new User(req.body);

            user.save(function (err, result) {
                if (err) {
                    res.status(500).send({message: err.message});
                }
                res.send({user: user});
            });
        });
    });

    app.get('/user/:id', function (req, res, next) {
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

    app.put('/user/:id', function (req, res, next) {
        User.findOne({'_id': req.params.id}, function (err, user) {
            if (err) return handleError(err);
            if (user) {
                res.status(200).json(user);
            }
        });
    });

    app.delete('/user/:id', function (req, res, next) {
        User
            .remove({_id: req.params.id})
            .exec()
            .then(function (result) {
                res.send(200).send(result)
            });
    });


    app.post('/auth/login', function (req, res) {
        User.findOne({ username: req.body.username }, '+password', function (err, user) {
            if (!user) {
                return res.status(401).send({message: 'Invalid email and/or password'});
            }
            user.comparePassword(req.body.password, function (isMatch) {
                if (!isMatch) {
                    return res.status(401).send({message: 'Invalid email and/or password'});
                }
                res.send({user: user});
            });
        });
    })
};