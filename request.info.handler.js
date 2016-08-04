var url = require('url');

function handleRequest(request, response) {
    var queries = url.parse(request.url, true).query;
    var sleep = queries.sleep;
    var statusCode = queries.statusCode;
    
    handleRequest0(request, response, sleep, statusCode);
}

function handleRequest0(request, response, sleep, statusCode) {
    if (!statusCode) statusCode = 200;
    writeRequestInfo(request, response, statusCode);
     
    if (sleep) {
        setInterval(function() {
            response.end();
        }, sleep);
    } else {
        writeRequestInfo(request, response, statusCode);
        response.end();
    }
}

function writeRequestInfo(request, response, statusCode) {
    var headers = request.headers;
	var url = request.url;
    
    console.log(url);
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
        
        process.on('uncaughtException', function(err) {
            console.log('Caught exception: ' + err);
        });
    });
    return c;
}

exports.handleRequest = handleRequest;