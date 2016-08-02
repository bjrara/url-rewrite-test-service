var server = require('./server');
init();

function init() {
    if (process.argv.length < 3) {
        console.log('$port $protocol is required.');
        return;
    }
    
    port = process.argv[2];
    protocol = process.argv[3];
    
    if (protocol === 'http') {
        server.startHttpServer(port);
        return;
    } else {
        server.startHttpsServer(port);
    }
}