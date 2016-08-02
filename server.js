var http = require('http');
var https = require('https');
var url = require('url');

var handler = require('./imitate.response.handler')

function start_http(port) {
    function onRequest(request, response) {
        if (request.url.indexOf('/favicon.ico') === 0) return;
        handler.handleRequest(request, response);
    }
    
    http.createServer(onRequest).listen(port);
    console.log('http server has started.');
}

function start_https(port) {
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

exports.start_http = start_http;
exports.start_https = start_https;