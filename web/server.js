var serialport = require('serialport'),
    firmata = require('firmata'),
    app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var arduino;
var serialports=[];

app.use(require('express').static(__dirname+'/webroot'));
server.listen(8080);


io.sockets.on('connection', function (socket) {
  // get a list of available serial ports
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

  // connect to a specific serial port
  socket.on('arduino_connect', function (data) {
    if (serialports && serialports[data.port]){
      arduino = new firmata.Board(serialports[data.port].comName, function(){
        socket.emit('arduino_connect', data);
      });
    }else{
      data.error={msg: "port not found"};
      socket.emit('arduino_connect', data);
    }
  });
});
