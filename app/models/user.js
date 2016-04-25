var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('md5');

var userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        validate: [
            function(password){
                return password.length >= 6
            }
        ]
    },
    created: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }

    user.password = md5(user.password);
    next();
});

userSchema.methods.comparePassword = function(password, done) {
    // console.log(this);
    var user = this;
    
    if (md5(password) == user.password) {
        done(true);
    } else {
        done(false);
    }
};

module.exports = mongoose.model('User', userSchema);