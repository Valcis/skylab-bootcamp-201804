const http = require('http')
const url = process.argv[2]

http.get(url, (res) =>{

    res.on('error', res => console.error)

    let str = ''
    res.on("error", console.error)
    res.setEncoding('utf8')

    res.on("data", (data) => {str += data})
    res.on("end", (data) => {
        console.log(str.length)
        console.log(str)
    })

})

// LEARNYOUNODE solution : 

/* var http = require('http')
    var bl = require('bl')

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    }) */