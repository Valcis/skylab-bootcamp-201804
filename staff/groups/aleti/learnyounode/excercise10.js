//Escuchar conexiones TCP en el puerto indicado por e primer argumento
const net = require('net')

const [port] = process.argv.splice(2)

var server = net.createServer(function (socket) {

    let _date = new Date()

    let res = formatDate(_date)
    
    socket.write(res + '\n');

    socket.end()

})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (hours.length < 2) hours = '0' + hours
    if (minutes.length < 2) minutes = '0' + minutes

    return [year, month, day].join('-') + ' ' + [hours, minutes].join(':')
}

server.listen(port)
