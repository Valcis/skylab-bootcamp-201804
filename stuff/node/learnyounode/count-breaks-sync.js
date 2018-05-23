const fs = require('fs')

const _path = process.argv[2]

//const content = fs.readFileSync(path).toString()
const content = fs.readFileSync(_path, 'utf8')

console.log(content.split('\n').length - 1)
