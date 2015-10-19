var server = require("./server");
init();

function init() {
	var port = 20001;
	if (process.argv.length >= 3) {
		port = process.argv[2];
		protocol = process.argv[3];
		if (protocol) {
			if (protocol == "https") {
				server.start_https(port);
				return;
			}
		}
		server.start_http(port);
	}
}