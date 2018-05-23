const [path, ext]= process.argv.slice(2)

const mymodule= require('./moduleMiM.js')

mymodule(path,ext,(err,data)=>{

    if(!err){
        data.forEach(element=> console.log(element))
    }else{
        console.error('This sucks')
    }
}
)