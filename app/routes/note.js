var router = require('express')();

var Note = require('../models/note');


router.post('/notes', function (req, res) {
    var note = new Note({
        text: req.body.text,
        user_id: req.params.id
    });

    note.save(function (err, result) {
        if (err) {
            res.status(500).send({ message: err.message });
        }
        res.send(result);
    });
});

router.get('/notes/:id', function (req, res, next) {
    Note
        .findById(req.params.id)
        .exec()
        .then(function (note) {
            console.log(note);
            if (note) {
                res.status(200).json(note);
            }
        })
        .catch(next)
});

router.patch('/notes/:id', function (req, res, next) {
    Note.findOne({'_id': req.params.id})
        .exec()
        .then(function (note) {
            note.text = req.body.text;
            return note.save();
        })
        .then(function (note) {
            res.send(note);
        })
        .catch(next)
});

router.delete('/notes/:id', function (req, res, next) {
    Note
        .remove({_id: req.params.id})
        .exec()
        .then(function (result) {
            res.status(200).send(result)
        })
        .catch(next)
});

module.exports = router;
