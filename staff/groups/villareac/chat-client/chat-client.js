const http = require('http')

// Copy this code at the terminal:
// node chat-client.js 192.168.0.42 3000 username message

const [host, port, from, message] = process.argv.slice(2)

url = `http://${host}:${port}?from=${from}&message=${message}`

http.get(url, res => {
    res.on('error', console.error)

    res.setEncoding('utf8')

    let content = ''
    res.on('data', chunk => content += chunk)

    res.on('end', () => console.log(content))

}).on('error', console.error)