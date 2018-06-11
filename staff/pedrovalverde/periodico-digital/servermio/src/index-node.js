// Se carga el módulo de HTTP
var http = require("http");

// Creación del servidor HTTP, y se define la escucha
// de peticiones en el puerto 80
var server = http.createServer(function (request, response) {

// Se define la cabecera HTTP, con el estado HTTP (OK: 200) y el tipo de contenido
response.writeHead(200, { 'Content-Type': 'text/plain' });
response.write("CONEXION HECHA CON NODE PURO\n");
// Se responde, en el cuerpo de la respuesta con el mensaje "Hello World"
response.end('| Server closed\n');
})

// Escuchar al puerto 80
server.listen(80);

// Poner un mensaje en la consola
console.log("Servidor funcionando en http://localhost:80/");

