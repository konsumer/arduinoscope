var firmata = require('firmata');
var io = require('socket.io');
var static = require('node-static');

var arduino;

/*
var arduino = new firmata.Board('path to usb',function(){
  //arduino is ready to communicate
});
*/


var file = new(static.Server)('./webroot');
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(8080);
