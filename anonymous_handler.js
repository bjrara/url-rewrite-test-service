var url = require('url');

function handleRequest(request, response) {
    var queries = url.parse(request.url, true).query;
    var sleep = queries.sleep;
    var statusCode = queries.code;
    
    handleRequest(request, response, sleep, statusCode);
}

function handleRequest(request, response, sleep, statusCode) {
    if (!statusCode) statusCode = 200;
    if (sleep) {
    	if (responseTime) {
    		setTimeout(function() {
    			writeRequestInfo(response, responseSize);
    		}, responseTime);
            response.end();
    		return;
    	} else {
    		writeRequestInfo(response, responseSize);
            response.end();
    	}
    }
}

function writeRequestInfo(request, response, statusCode) {
    var headers = request.headers;
	var url = request.url;
    
    response.writeHead(statusCode, {"Content-Type": "text/plain"});
    response.write("Path: " + url + "\n");
    response.write("Headers: " + JSON.stringify(request.headers) + "\n");
    
	var cookie = parseCookie(request.headers.cookie);
    if (cookie) {
        response.write("Cookies: " + JSON.stringify(cookie));
    }
}

function parseCookie(cookie) {
	var c = {},
	rc = cookie;
    rc && rc.split(';').forEach(function(cookie) {
        var arr = cookie.split('=');
        c[arr.shift().trim()] = decodeURI(arr.join('='));
        
        process.on('uncaughtException', (err) => {
            console.log('Caught exception: ' + err);
        });
    });
    return c;
}

exports.handleRequest = handleRequest;