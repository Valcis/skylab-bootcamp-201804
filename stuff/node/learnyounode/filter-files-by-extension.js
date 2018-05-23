const fs = require('fs')
const path = require('path')

function filterFilesByExtension(_path, ext, callback) {
    fs.readdir(_path, (err, list) => {
        
        if (err) return callback(err)

        const filtered = list.filter(file => path.extname(file) === `.${ext}`)

        callback(null, filtered)
    })
}

module.exports = filterFilesByExtension