const http = require('http')
const bl = require('bl')

const url = process.argv[2]

http.get(url, res => {
    res.on('error', console.error)

    res.setEncoding('utf8')

    res.pipe(bl((err, content) => {
        console.log(content.length)
        //console.log(content.toString().length)
        if (err) return console.err(err)

        console.log(content.toString())
    }))
})