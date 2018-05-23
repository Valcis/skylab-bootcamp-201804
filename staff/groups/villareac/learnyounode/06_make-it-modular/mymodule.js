var fs = require('fs')
var path = require('path');

filter = (folder, ext, callback) => {
    fs.readdir(folder, (err, list) => {
        if (err) return callback(err)

        const result = list.filter(file => path.extname(file) === '.' + ext)
        callback(null, result)
    })
}

module.exports = filter


