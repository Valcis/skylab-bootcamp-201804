var express = require('express');
var app = express();

var constants = require('./constants');

console.log(constants.MY_CONSTANT); // 'some value'

constants.MY_CONSTANT = 'some other value';

console.log(constants.MY_CONSTANT); // 'some value'

app.get('/', function (req, res) {

  res.send('CONEXION HECHA CON EXPRESS!');

});

app.listen(80, function () {

  console.log('Aplicación ejemplo, escuchando el puerto 80!');

});