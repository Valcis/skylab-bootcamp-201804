// $ node file-server.js 3000 helloworld.txt
// to test connection:
// $ curl http://localhost:3000

const http = require('http')
const fs = require('fs')

const [port, file] = process.argv.slice(2)

const server = http.createServer((req, res) => {
    // const rs = fs.createReadStream(file).pipe(res)
    // res.pipe(res)
    console.log(req.url);
    if (req.url === '/hola') {
        fs.createReadStream('sum.js').pipe(res)
    } else {
        fs.createReadStream(file).pipe(res)
    }
})

server.listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    server.close()

    process.exit()
})