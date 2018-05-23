const http = require('http')

var map = require('through2-map')

const [port] = process.argv.splice(2)

var server = http.createServer(function (req, res) {
    // res.writeHead(200, { 'content-type': 'text/plain' })

    const {method} = req

    if (method){

        // let content = ''

        // req.on('data', chunk => content += chunk)

        // req.on('end', ()=> res.end(content.toUpperCase()))

        req.pipe(map(raw => raw.toString().toUpperCase())).pipe(res)

    }

    res.end()

}).listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    server.close()

    process.exit()
})