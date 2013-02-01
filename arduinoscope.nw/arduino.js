/*

Simple arduino/serial wrapper for CLI & node-webkit
non-GUI code to do stuff with arduino

*/
var firmata = require('firmata');
var serialport = require("serialport");
var child_process = require('child_process');


// mac serilport doesn't list ports correctly
// https://github.com/voodootikigod/node-serialport/issues/83
exports.list = function(callback){
    callback = callback || function (err, ports){};
    if (process.platform !== 'darwin'){
        serialport.list(function(err, ports){
            out = [];
            ports.forEach(function(port){
                out.push(port.comName);
            });
            callback(null, out);
        });
        return;
    }

    child_process.exec('ls /dev/tty.*', function(err, stdout, stderr){
        if (err) return callback(err);
        if (stderr !== "") return callback(stderr);
        return callback(null, stdout.split("\n").slice(0,-1));
    });
};

exports.board = function(com, callback){
    callback = callback || function (err, board){};
    var board = new firmata.Board(com, function(err){
        callback(err, board);
    });
};
