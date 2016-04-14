var fs = require('fs'),
    path = require('path');

module.exports.readdirRecursiveSync = function(directory) {
    var result = [];
    readdir(directory);
    return result;

    function readdir(current) {
        var files = fs.readdirSync(current);

        files.forEach(function(file) {
            var absViam = path.resolve(current, file),
                stat = fs.statSync(absViam);

            if (stat.isFile()) {
                result.push(path.relative(directory, absViam));
            }

            if (stat.isDirectory()) {
                readdir(absViam);
            }
        })
    }
};