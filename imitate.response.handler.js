var url = require('url');

function handleRequest(request, response) {
	var queries = url.parse(request.url, true).query;
	var responseTime = queries.responseTime;
	var responseSize = queries.responseSize;
	var statusCode = queries.statusCode;
	
	handleRequest0(request, response, responseSize, responseTime, statusCode);
}

function handleRequest0(request, response, responseSize, responseTime, statusCode) {
	if (!responseSize) responseSize = 0;
	if (!statusCode) statusCode = 200;
	
	if (responseTime) {
		setInterval(function() {
			writeResponse(response, responseSize, statusCode);
		}, responseTime);
	} else {
		writeResponse(response, responseSize, statusCode);
	}
}

function writeResponse(response, responseSize, statusCode) {
	response.writeHead(statusCode, {'Content-Type': 'text/plain'});
	for (var i = 0; i < responseSize; i++) {
		response.write('b');
	}
    response.end();
}

exports.handleRequest = handleRequest;