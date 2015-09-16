var http = require("http");
var url = require("url");

function handleRequest(request, response) {
	var url = request.url;
	var headers = request.headers;
	response.writeHead(200, {"Content-Type": "text/plain"});
	var cookie = parseCookie(request.headers.cookie);
  response.write("Destination Url: " + url + "\n");
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