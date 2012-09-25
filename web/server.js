var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    firmata = require('firmata');

var arduino;

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('connect', function (data) {
    arduino = new firmata.Board(data.path, function(){

    });
  });
});
