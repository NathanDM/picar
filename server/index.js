const WebSocketServer = require('websocket').server;
const http = require('http');


// create the server
const server = http.createServer();

// WebSocket server
const wsServer = new WebSocketServer({ httpServer: server });
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('message  : ', message);
        }
    });
    connection.on('close', function(connection) {
        console.log('see you');
    });
});

server.listen(3000);
