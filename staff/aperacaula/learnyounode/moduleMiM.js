const fs = require('fs')

module.exports= function(path, ext, callback){

    const list = fs.readdir(path, function (err,data){
        
        if (!err){
            let list2=[]
            data.forEach(component => {
                if(component.indexOf(`.${ext}`)>-1){
                    list2.push(component)
                }
            })
            callback(err, list2)
        }else{

            callback(err)
        }
    })


}

