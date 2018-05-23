const fs = require('fs')
const path = process.argv[2]

const buf = fs.readFileSync(path)

var str = buf.toString()
var strArr = str.split('\n')

console.log(strArr.length - 1)



// FROM LEARNYOUNODE SOLUTION : 
/* var fs = require('fs')

var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines) */

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1