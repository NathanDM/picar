// const WebSocketServer = require('websocket').server;
// const http = require('http');

import { server as WebSocketServer } from 'websocket'
import http from 'http'

const server = http.createServer();


// create the server
wsServer = new WebSocketServer({ httpServer: server });

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

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
