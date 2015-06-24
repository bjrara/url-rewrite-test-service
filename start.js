var server = require("./server");
init();

function init() {
	var port = 20001;
	if (process.argv.length >= 3) {
		port = process.argv[2];
	}
	server.start(port);
}