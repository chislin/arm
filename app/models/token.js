var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
    }
});

module.exports = mongoose.model('Token', tokenSchema);