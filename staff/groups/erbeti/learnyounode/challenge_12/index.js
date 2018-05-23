const http = require('http')
const fs = require('fs')
const through2 = require ('through2-map')
const port = process.argv[2]

const server=http.createServer((req, res)=>{

    const {method}=req

    // let content=''
    // req.on('data', chunk => content += chunk)
    // reg.on('end', ()=>res.end(content.toUpperCase()))

    req.pipe(through2(data =>data.toString().toUpperCase())).pipe(res)

})

server.listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', ()=> {
    console.log('\nstopping server')

    server.close()

    process.exit()
})

 

