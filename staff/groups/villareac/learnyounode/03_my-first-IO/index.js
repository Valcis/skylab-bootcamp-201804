var fs = require('fs')

// recuperamos el texto del fichero y lo pasamos a string
let str = fs.readFileSync(process.argv[2]).toString()
// creamos un array que splitea por cada espacio en blanco
let arr = str.split('\n')
let result = arr.length - 1

console.log(result)

