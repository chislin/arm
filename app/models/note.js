var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    text: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Note', noteSchema);
