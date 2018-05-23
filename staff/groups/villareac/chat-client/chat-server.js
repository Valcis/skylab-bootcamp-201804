// $ node chat-server.js 3000
// to test connection:
// $ curl http://localhost:3000?from=pepito&message=whatever

const http = require('http')
const qs = require('querystring')

const [port, file] = process.argv.slice(2)

let messages = 'chat history:\n'

const server = http.createServer((req, res) => {
    const { url } = req
    const index = url.indexOf('?')

    if (index > -1) {
        const data = qs.parse(req.url.substring(index + 1))

        messages += `${data.from}: ${data.message}\n`
    }

    res.end(messages)
})

server.listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    server.close()

    process.exit()
})