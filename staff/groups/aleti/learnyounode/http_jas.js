const http = require('http');
const url = require('url');

const routes = {
  "/api/parsetime": function (parsedUrl) {
    time = new Date(parsedUrl.query.iso);
    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    };
  },
  "/api/unixtime": function (parsedUrl) {
    return { unixtime: (new Date(parsedUrl.query.iso)).getTime() };
  }
}

const server = http.createServer(function (request, response) {
  parsedUrl = url.parse(request.url, true);
  resource = routes[parsedUrl.pathname];
  if (resource) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(resource(parsedUrl)));
  }
  else {
    response.writeHead(404);
    response.end();
  }
});
server.listen(process.argv[2]);

////////////////// FROM LEARNYOUNODE SOLUTION : ////////////////////////
/* function algo() {
  var http = require('http')
  var url = require('url')

  function parsetime(time) {
    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    }
  }

  function unixtime(time) {
    return { unixtime: time.getTime() }
  }

  var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url)) {
      result = parsetime(time)
    } else if (/^\/api\/unixtime/.test(req.url)) {
      result = unixtime(time)
    }

    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(404)
      res.end()
    }
  })
  server.listen(Number(process.argv[2]))
} */