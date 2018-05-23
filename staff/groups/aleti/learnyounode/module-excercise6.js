<<<<<<< HEAD
var fs = require('fs');
var path = require('path');

module.exports = function (dirname, ext, callback) {
  
  var extension = "." + ext;
  
  fs.readdir(dirname, function (err, files) {
    
    if (err) {
      return callback(err);
    }
=======
const fs = require('fs')
const path = require('path')

module.exports = (_dir, _ext, callback) => {
>>>>>>> e350543837abd63bd395fbed1624e13f4245dee8

    var result = [];
    
    files.forEach(function (entry) {
      if (path.extname(entry) == extension) {
         result.push(entry);
      }

    });

<<<<<<< HEAD
    callback(null, result);

  });
=======
        const data = files.filter(file => path.extname(file) ===  `.${_ext}`)

        setTimeout(callback(null, data),0)
>>>>>>> e350543837abd63bd395fbed1624e13f4245dee8

};