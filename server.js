var handler = require("./anonymous_handler");
var http = require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");

function start_http(port) {
  function onRequest(request, response) {
    if (request.url.indexOf('/favicon.ico') === 0)
      return;
    handler.handleRequest(request, response);
  }
  http.createServer(onRequest).listen(port);
  console.log("http server has started.");
}

function start_https(port) {
  function onRequest(request, response) {
    if (request.url.indexOf('/favicon.ico') === 0)
      return;
    handler.handleRequest(request, response);
  }
	
	var options = {
		key: fs.readFileSync('cert/ca.key'),
		cert: fs.readFileSync('cert/ca.crt')
	}
	https.createServer(options, onRequest).listen(port);
  console.log("https server has started.");
}
exports.start_http = start_http;
exports.start_https = start_https;