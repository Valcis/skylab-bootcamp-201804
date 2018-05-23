var fs = require('fs')
var path = require('path')

//console.log(process.argv[3])

fs.readdir(process.argv[2], (err, files)=>{

    files.filter(file => path.extname(file) ===  `.${process.argv[3]}`).forEach(file => { console.log(file)})        
    
})

// FROM LEARNYOUNODE SOLUTION :

/* var fs = require('fs')
    var path = require('path')

    var folder = process.argv[2]
    var ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    }) */