const WebSocketServer = require('websocket').server;
const http = require('http');


// create the server
const server = http.createServer();

let users = [];

function broadcast(message) {
  users.forEach((userConnection) => {
    userConnection.send(message);
  });
}

function registerUser(userConnection) {
  users.push(userConnection);
}

function unregisterUser(userConnection) {
  // users.split(userConnection);
}

// WebSocket server
const wsServer = new WebSocketServer({ httpServer: server });
wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  registerUser(connection);
  console.log('new client  : ', connection);

  connection.on('message', (message) => {
    broadcast(message.utf8Data);
  });
  connection.on('close', (closeRequest) => {
    unregisterUser(closeRequest);
    console.log('see you', closeRequest);
  });
});


server.listen(3000);
