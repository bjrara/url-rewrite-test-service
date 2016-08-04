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
	
    writeResponse(response, responseSize, statusCode);
	if (responseTime) {
		setInterval(function() {
            response.end();
		}, responseTime);
	} else {
		writeResponse(response, responseSize, statusCode);
        response.end();
	}
}

function writeResponse(response, responseSize, statusCode) {
	response.writeHead(statusCode, {'Content-Type': 'text/plain'});
	for (var i = 0; i < responseSize; i++) {
		response.write('b', function(err) {
		    response.end();
            return;
		});
	}
}

exports.handleRequest = handleRequest;