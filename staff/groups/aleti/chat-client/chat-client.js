const http = require('http')
//const cs = require('concat-stream')
const [ip, port, from, message] = process.argv.slice(2)

let url = `http://${ip}:${port}?from=${from}&message=${message}`

http.get(url, res =>{

    res.setEncoding('utf8')
    res.on('error', res => console.error)
    let data = ''
    res.on('data', resp => data += resp)
    res.on("end", () => {
        console.log(data)
    })

})

// http.get(url, res =>{

//     res.setEncoding('utf8')

//     res.pipe(cs(console.log))

// })