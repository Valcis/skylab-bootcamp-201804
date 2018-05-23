const http = require('http');
// const bl = require('bl')

let url1 = process.argv[2]
let url2 = process.argv[3]
let url3 = process.argv[4]

http.get(url1, (response) => {
    response.setEncoding('utf8')
    var data = '';
    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        console.log(data);

    });
    http.get(url2, (response) => {
        response.setEncoding('utf8')
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            console.log(data);

        });
        http.get(url3, (response) => {
            response.setEncoding('utf8')
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                console.log(data);

            });

        })

    })

})
