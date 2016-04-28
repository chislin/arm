var mongoose = require('mongoose');
var md5 = require('md5');

var tokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hash: {
        type : String,
        default : function(){
            return md5(Math.random());
        }
    },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);