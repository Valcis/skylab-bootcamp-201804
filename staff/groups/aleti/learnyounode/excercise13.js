const http = require('http')
const url = require('url')

const [port] = process.argv.splice(2)

var server = http.createServer(function (req, res) {

    const { method, pathname, query: { iso } } = req

    if (method === 'GET'){

        let object = url.parse(req.url, true)
        let date = new Date(object.query.iso)
    
        let dateParsed = {"hour": date.getHours(), "minute": date.getMinutes(), "second": date.getSeconds()}
    
        res.end(JSON.stringify(dateParsed))

    } else res.end(`cannot ${method}`)

}).listen(port)