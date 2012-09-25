var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    SerialPort = require('serialport').SerialPort,
    firmata = require('firmata');

var arduino;
var serialports=[];

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  // get a list of available arduinos
  socket.on('list', function(data){
    serialport.list(function (err, ports) {
      if (!err){
        serialports = ports;
        data.ports=[];
        ports.forEach(function(port){
          data.ports.push(port.comName);
        });
      }else{
        data.error = err;
      }
      socket.emit('list', data);
    });
  });

  // connect to a specific arduino
  socket.on('connect', function (data) {
    if (serialports[data.port]){
      arduino = new firmata.Board(serialports[data.port], function(){
        socket.emit('connect', data);
      });
    }else{
      data.error={msg: "port not found"};
      socket.emit('connect', data);
    }
  });
});
