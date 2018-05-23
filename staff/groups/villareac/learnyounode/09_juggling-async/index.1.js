const http = require('http');

let url1 = process.argv[2]
let url2 = process.argv[3]
let url3 = process.argv[4]

let results = []
let count = 0;

httpGet = (i) => {
    http.get(process.argv[2 + i], (response) => {
        response.setEncoding('utf8')
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            
            results[i] = data;
            count++;
            if (count === 3) {
                printResults()
            }
        });
    })
}

printResults = () => {
    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
    }
}

executeHttpGet = () => {
    for (let i = 0; i < 3; i++) {
        httpGet(i)
    }
}

executeHttpGet()





