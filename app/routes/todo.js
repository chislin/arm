var router = require('express')();

var ToDo = require('../models/todo');

var authenticate = require('../middlewares/auth');

router.post('/todo/:user_id', function (req, res) {
    console.log(req.body);
    var todo = new ToDo({
        text: req.body.text,
        user_id: req.params.user_id,
        expired: req.body.expired
    });

    todo.save(function (err, result) {
        if (err) {
            res.status(500).send({message: err.message});
        }
        res.send(result);
    });
});

router.get('/todo/:user_id', function (req, res, next) {
    ToDo
        .find({user_id: req.params.user_id})
        .then(function (todo) {
            res.status(200).send(todo);
        })
        .catch(next)
});

router.patch('/todo/:id', function (req, res, next) {
    ToDo
        .findById(req.params.id)
        .then(function (todo) {
            todo = Object.assign(todo, req.body);
            return todo.save();
        })
        .then(function (todo) {
            res.send(todo);
        })
        .catch(next)
});

router.delete('/todo/:id', function (req, res, next) {
    ToDo
        .remove({_id: req.params.id})
        .exec()
        .then(function (result) {
            res.status(200).send(result)
        })
        .catch(next)
});

module.exports = router;
