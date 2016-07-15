var http = require("http");
var url = require("url");

function handleRequest(request, response) {
	console.log('['+new Date().toUTCString()+']' +request.url);
	var sleep = url.parse(request.url, true).query.sleep;
  if (request.url.indexOf('/error?') === 0) {
  	genError(request, response, sleep);
		return;
  } else {
  	printFullInfo(request, response, sleep);
  }
}

function genError(request, response, sleep) {
	var statusCode = url.parse(request.url, true).query.code;
	if (sleep) {
		setTimeout(function() {
			response.writeHead(statusCode, {"Content-Type": "text/plain"});
			response.write("Error status code: " + statusCode);
			response.end();
		}, sleep);
		return;
	}
	response.writeHead(statusCode, {"Content-Type": "text/plain"});
	response.write("Error status code: " + statusCode);
	response.end();
}

function printFullInfo(request, response, sleep) {
	var headers = request.headers;
	var url = request.url;
	if (sleep) {
		setTimeout(function() {
			response.writeHead(200, {"Content-Type": "text/plain"});
		  response.write("Destination Url: " + url + "\n");
			response.write("Headers: " + JSON.stringify(request.headers) + "\n");
			setTimeout(function() {
				console.log("return");
			  response.end();
			}, sleep);
		}, sleep);
		return;
	}
	response.writeHead(200, {"Content-Type": "text/plain"});
	var cookie = parseCookie(request.headers.cookie);
  response.write("Destination Url: " + url + "\n");
	response.write("Headers: " + JSON.stringify(request.headers) + "\n");
	response.write("Cookies: " + JSON.stringify(cookie));
  response.end();
}

function parseCookie(cookie) {
	var list = {},
	rc = cookie;
    rc && rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

function handleError(response) {
  response.writeHead(500, {"Content-Type" : "text/plain"});
  response.write("error");
  response.end();
}

exports.handleRequest = handleRequest;
exports.handleError = handleError;