const http = require('http')
const url = require('url')
const port = process.argv[2]

const server= http.createServer((req, res)=>{

    const {method}= req.method

    if (method==='GET'){

        const urlReq = req.url

    if (urlReq.indexOf('parsetime') > -1){

        const data = url.parse(urlReq,true)

        let time= data.query.iso.substring(11).split(':')
        time[2]=time[2].substring(0,2)

        const [hour,minute,second]=time
        const resultJson= JSON.stringify({hour,minute,second})


        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(resultJson)
        

    }else if (urlReq.indexOf('unixtime') > -1){
        
        const data = url.parse(urlReq,true)

        let time= data.query.iso.substring(11).split(':')

        const [hour,minute,second]=time
        
        const resultUnix= JSON.stringify({hour,minute,second})


        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(resultUnix)
        



        }


    }else res.end(_)
    

    



})


server.listen(port, ()=> console.log('activated server'))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    server.close()

    process.exit()
})

