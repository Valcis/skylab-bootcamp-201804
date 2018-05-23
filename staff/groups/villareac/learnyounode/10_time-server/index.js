const net = require('net');

var date = new Date() 
var dateNow = date.getFullYear() + '-' + (padNumber()) + '-' + date.getDate() + ' ' + date.getHours()  + ':' + date.getMinutes() 

function padNumber(){
    var day = parseInt(date.getMonth()) + 1
    return (day < 10) ? '0' + day : day;
    
}

var server = net.createServer(function (socket) {
    socket.write(dateNow + '\n')
    socket.end();
});

server.listen(process.argv[2]);

