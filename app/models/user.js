var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('md5');

var userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        select: false,
        validate: [
            function(password){
                return password.length >= 6
            }
        ]
    }
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
    if (md5(password) == this.password) {
        done(true);
    } else {
        done(false);
    }
};

module.exports = mongoose.model('User', userSchema);