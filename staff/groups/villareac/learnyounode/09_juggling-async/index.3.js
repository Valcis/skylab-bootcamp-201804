const http = require('http');
const bl = require('bl');

let results = []
let count = 0;

httpGet = (i) => {
    http.get(process.argv[2 + i], (response) => {
        response.pipe(bl(function (err, data) {
            if (err) {
                return console.error(err)
            }
            results[i] = data.toString();
            count++;
            if (count === 3) {
                printResults()
            } else {
                httpGet(count)
            }
        }));
    })
}

printResults = () => {
    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
    }
}

httpGet(count)





