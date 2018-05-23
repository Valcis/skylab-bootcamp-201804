// $ node cp.js holamundo.txt helloworld.txt

// $ mkfile 100M dummy.file (for creating big dummy files)
// $ node cp.js dummy.file tonto.file

const fs = require('fs')
const memoryUsage = require('./memory-usage')

const memStart = memoryUsage()
let memRead, memWrite

const [from, to] = process.argv.slice(2)

let count = 0


const rs = fs.createReadStream(from)
const ws = fs.createWriteStream(to)

rs.on('data', () => {
    if (++count % 100 === 0) {
        memRead = memoryUsage()

        console.log(memRead - memStart)
    }
})

rs.on('end', () => {
    ws.end()

    memWrite = memoryUsage()

    console.log(memWrite - memStart)
})

rs.pipe(ws)
// Igual que esto:
// rs.on('data', chunk => ws.write(chunk))

