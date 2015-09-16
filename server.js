var handler = require("./anonymous_handler");
var http = require("http");
var url = require("url");

function start(port) {
  function onRequest(request, response) {
    if (request.url.indexOf('/favicon.ico') === 0)
      return;
    handler.handleRequest(request, response);
  }
  http.createServer(onRequest).listen(port);
  console.log("server has started.");
}
exports.start = start;