var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: { type: Date, default: Date.now },
    expired: Date,
    done: { type: Boolean, default: false }
});


module.exports = mongoose.model('ToDo', todoSchema);
