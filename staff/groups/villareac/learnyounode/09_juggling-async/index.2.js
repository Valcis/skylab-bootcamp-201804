const http = require('http');

let results = []
let count = 0;

httpGet = (i) => {
    http.get(process.argv[2 + i], (response) => {

        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            
            results[i] = data.toString();
            count++;
            if (count === 3) {
                printResults()
            }else{
                httpGet(count)
            }
        });
    })
}

printResults = () => {
    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
    }
}

httpGet(count)





