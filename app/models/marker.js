var mongoose = require('mongoose');

var markerSchema = new mongoose.Schema({
    note: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    id : String,
    coords : {
        latitude : String,
        longitude : String
    },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Marker', markerSchema);
