const http= require ('http')
const url =require ('url')
const port = process.argv[2]


const server= http.createServer((req, res) =>{

    const {method, url:_url}= req

    if (method==='GET'){

        let fin = url.parse(_url, true)

        const {pathname, query: {iso} } = fin
        if (pathname==='/api/parsetime'){

            const date=new Date (iso)
            const ret= {
                hour: date.getHours(),
                minutes:date.getMinutes(),
                seconds: getSeconds()
            }
            res.writeHead(200, { 'Content-Type': 'application/json' }) 
            res.end(JSON.stringify(ret))

        }else if (pathname==='/api/unixtime'){
            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify({
                unixtime: new Date (iso).getTime()
            }))

        }else res.end(`cannot ${pathname}`)


    } else res.end(`cannot ${method}`)

})
server.listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', ()=> {
    console.log('\nstopping server')

    server.close()

    process.exit()
})