const fs = require('fs')

const [path, ext]= process.argv.slice(2)

fs.readdir(path, function (err,data){
    if (!err){
        data.forEach(component => {
            if(component.indexOf(`.${ext}`)>-1){
                console.log(component)
            }
        })
    }
})