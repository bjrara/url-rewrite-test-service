var http = require("http");
var url = require("url");

function handleRequest(request, response) {
	var queries = url.parse(request.url, true).query;
	var responseTime = queries.responseTime;
	var responseSize = queries.responseSize;
	var statusCode = queries.statusCode;
	
	handleRequest(request, response, responseSize, responseTime);
}

function handleRequest(request, response, responseSize, responseTime, statusCode) {
	if (!responseSize) responseSize = 0;
	if (!statusCode) statusCode = 200;
	
	if (responseTime) {
		setTimeout(function() {
			writeResponse(response, responseSize);
		}, responseTime);
        response.end();
		return;
	} else {
		writeResponse(response, responseSize);
        response.end();
	}
}

function writeResponse(response, responseSize, statusCode) {
	response.writeHead(statusCode, {'Content-Type': 'text/plain'});
	for (var i = 0; i < responseSize; i++) {
		response.write(i);
	}
}

exports.handleRequest = handleRequest;