var fs = require('fs')
var path = require('path');

let folder = process.argv[2]
let ext = '.' + process.argv[3]

let buf = fs.readdir(folder, (error, list) => {
    result = list.filter(file => path.extname(file) === ext)
    result.forEach(result => console.log(result))
})

