var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('Hello world');
});

server.on('close', function() { console.log('Bye Bye !') });
server.on('close', function() { console.log('Bye Bye TRAORE !') });

server.listen(8080);

server.close();