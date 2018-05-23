// var fs = require('fs')
// var path = require('path');
var filter = require('./mymodule') 

let folder = process.argv[2]
let ext = process.argv[3]

filter(folder, ext, (err, list) => {
    if(err) return process.exit(1)

    list.forEach(file => console.log(file))
})

