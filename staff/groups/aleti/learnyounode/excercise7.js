const http = require('http')

http.get(process.argv[2], (res) =>{

    res.on('error', res => console.error)

    res.setEncoding('utf8')
    res.on("data", (data) => {console.log(data)})

})

// LEARNYOUNODE SOLUTION
/* 
var http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error) */