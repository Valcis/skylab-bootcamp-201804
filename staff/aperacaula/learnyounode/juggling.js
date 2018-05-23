const http= require('http')
const urls= process.argv.slice(2)

dataInOrder=[]
contador=0

for (let i=0; i<urls.length; i++){
        let text=''
        http.get(urls[i], resp=>{
    
            resp.on('error', ()=> console.error())
            
            resp.on('data', chunk=> {
                text+=chunk
                
            })
            
            resp.on('end',()=> {
                contador++
                dataInOrder[i]=text
                if (contador===3){
                    dataInOrder.forEach(element=> console.log(element))
                }
            
            })
        }
        )
    
    }

