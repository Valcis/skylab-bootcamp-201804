const http = require('http');
// const bl = require('bl')

let url = process.argv[2]

http.get(url, (response) => {
    response.setEncoding('utf8')

    chunks = []

    response.on("data", chunk => chunks.push(chunk))
    
    response.on("end", () => {

        const text = chunks.join('')
        console.log(text.length)
        console.log(chunks.join(''))
    })
})