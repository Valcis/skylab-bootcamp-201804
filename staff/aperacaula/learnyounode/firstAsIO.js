const fs = require('fs')

const text= fs.readFile(process.argv[2], 'utf8',(err,data)=>{
    if(!err){
        console.log(data.split('\n').length-1)
    }else{
        throw Error(err)
    }
    
} ) 