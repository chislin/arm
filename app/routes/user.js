var router = require('express')();
var User = require('../models/user');
var Token = require('../models/token');

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

    //    
    //    
    //    
    //    
    //    
    //    
    //     , function (err, existingUser) {
    //     if (existingUser) {
    //         return res.status(409).send({message: 'Email is already taken'});
    //     }
    //
    //     var user = new User(req.body);
    //
    //     user.save(function (err, result) {
    //         if (err) {
    //             res.status(500).send({message: err.message});
    //         }
    //         res.send({user: user});
    //     });
    // });
});

router.get('/user/:id', function (req, res, next) {
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

router.put('/user/:id', function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, user) {
        if (err) return handleError(err);
        if (user) {
            res.status(200).json(user);
        }
    });
});

router.delete('/user/:id', function (req, res, next) {
    User
        .remove({_id: req.params.id})
        .exec()
        .then(function (result) {
            res.send(200).send(result)
        });
});


router.post('/auth/login', function (req, res) {
    User.findOne({username: req.body.username}, '+password', function (err, user) {
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
});

module.exports = router;
