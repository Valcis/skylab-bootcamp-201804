const fs = require('fs')
const http = require('http')

const [port, file] = process.argv.splice(2)

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' })

    const a = fs.createReadStream(file)
    a.pipe(res)

}).listen(port)