var router = require('express')();

var Marker = require('../models/marker');

var authenticate = require('../middlewares/auth');

router.post('/marker/:user_id', authenticate(),  function (req, res) {
    req.body.user_id = req.params.user_id;

    var marker = new Marker(req.body);

    marker.save(function (err, result) {
        if (err) {
            res.status(500).send({ message: err.message });
        }
        res.send(result);
    });
});

router.get('/marker/:user_id', authenticate(), function (req, res, next) {
    Marker
        .find({ user_id : req.params.user_id })
        .then(function (marker) {
            res.status(200).send(marker);
        })
        .catch(next)
});

router.patch('/marker/:id',  authenticate(), function (req, res, next) {
    Marker
        .findOne({'_id': req.params.id})
        .then(function (marker) {
            marker.note = req.body.note;
            return marker.save();
        })
        .then(function (marker) {
            console.log(marker);
            res.send(marker);
        })
        .catch(next)
});

router.delete('/marker/:id', authenticate(), function (req, res, next) {
    console.log(req.body);
    Marker
        .remove({_id: req.params.id})
        .exec()
        .then(function (result) {
            res.status(200).send(result)
        })
        .catch(next)
});

module.exports = router;
