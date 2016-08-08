var http = require('http');
var https = require('https');
var url = require('url');

var handler = require('./imitate.response.handler')
//var handler = require('./request.info.handler')

function startHttpServer(port) {
    function onRequest(request, response) {
        if (request.url.indexOf('/favicon.ico') === 0) return;
        handler.handleRequest(request, response);
    }
    
    http.createServer(onRequest).on('connection', function(socket) {
        socket.setTimeout(10000);
    }).listen(port);
    console.log('http server has started.');
}

function startHttpsServer(port) {
    function onRequest(request, response) {
        if (request.url.indexOf('/favicon.ico') === 0) return;
        handler.handleRequest(request, response);
    }
	
    var fs = require('fs');
	var options = {
		key: fs.readFileSync('ssl/server.key'),
		cert: fs.readFileSync('ssl/server.crt')
	}
    
	https.createServer(options, onRequest).listen(port);
    console.log('https server has started.');
}

exports.startHttpServer = startHttpServer;
exports.startHttpsServer = startHttpsServer;