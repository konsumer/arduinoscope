var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  pkg = require('./package.json'),
  optimist  = require('optimist'),
  firmata = require('firmata');


var argv = optimist
  .usage('Create a web-based Arduino Oscilliscope\nUsage: $0')
  .default({
    p:8080,
    d:'/dev/cu.usbmodem1d11'
  })
  .describe('p', 'Port to listen on')
  .describe('d', 'Device that arduino is on')
  .alias('p', 'port')
  .alias('d', 'device')
  .argv;

try{
  app.listen(argv.port);
  console.log('Listening on http://0.0.0.0:%d' , argv.port);
}catch(e){
  optimist.showHelp();
}

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(404);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

values = {};

var board = new firmata.Board(argv.device,function(){
  board.analogPins.forEach(function(pin){
    board.pinMode(pin,board.MODES.ANALOG);
  });
});

io.set('log level', 1); // reduce logging

io.sockets.on('connection', function(socket){
  var sendPins = function(d){
    if (d && d.pin){
      socket.emit('a', board.pins[d.pin]);
    }else{
      out = [];
      board.analogPins.forEach(function(pin){
        out.push(board.pins[pin]);
      });
      socket.emit('a', out);
    }
  };
  socket.on('a', sendPins);

  // initially, send all analog pins
  sendPins();
});
