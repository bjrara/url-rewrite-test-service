var log4js = require('log4js');
var today = new Date().toISOString();
var todayInfo = today + '-info';
var todayError = today + '-error';
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/' + todayInfo + '.log'), todayInfo);
log4js.addAppender(log4js.appenders.file('logs/' + todayError + '.log'), todayError);
var infoLogger = log4js.getLogger(todayInfo);
infoLogger.setLevel('INFO');
var errorLogger = log4js.getLogger(todayError);
errorLogger.setLevel('ERROR');

function handleRequest(url, headers, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	var urlIn = headers['urlIn'];
	var urlOut = headers['urlOut'];
	if (urlOut == url)
		logInfo(urlIn, urlOut);
	else
		logError(urlIn, urlOut, url);
  	response.write(url);
  	response.end();
}

function logInfo(urlIn, urlOut) {
	infoLogger.info('origin url is ' + urlIn + ', and redirects to ' + urlOut);
}

function logError(urlIn, urlOut, urlActual) {
	errorLogger.error('origin url is ' + urlOut + ', and should redirect to ' + urlOut + ', but goes to ' + urlActual);
}

function handleError(response) {
  response.writeHead(500, {"Content-Type" : "text/plain"});
  response.write("error");
  response.end();
}

exports.handleRequest = handleRequest;
exports.handleError = handleError;