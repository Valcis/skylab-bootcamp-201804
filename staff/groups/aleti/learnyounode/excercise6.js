//import path from "path";
const path = require('./module-excercise6')

mymodule(process.argv[2], process.argv[3], function(err, files) {
  
  if(err) throw err

  files.forEach(file => { console.log(file) })

    if (err) throw err

    data.forEach(file => {
        console.log(file)
    });

})
