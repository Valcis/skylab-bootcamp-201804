var fs = require('fs')

let path = process.argv[2]

let buf = fs.readFile(path, (error, data) => {
    let str = data.toString()
    let arr = str.split('\n')
    let result = arr.length - 1
    console.log(result)
})



