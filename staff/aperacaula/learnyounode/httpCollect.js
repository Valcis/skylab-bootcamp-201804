const http= require('http')

const url = process.argv[2]

http.get(url, (res)=>{

        res.on('error', ()=>console.error())

        res.setEncoding('utf8')

        let contador= 0
        let text= ''
        res.on('data', (chunk)=> {
            contador+=chunk.length
            text+= chunk
        })

        res.on('end', ()=>{
            console.log (contador)
            console.log(text)
        })


})