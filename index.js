var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');
var path = require('path');
var piblaster = require("pi-blaster.js");

var DIR = '/sys/class/gpio/';
//var PINS = [6, 13, 19, 26];
var PINS = [17, 27, 22, 23];
var GPIOS = [
    path.join(DIR, 'gpio' + PINS[0]),
    path.join(DIR, 'gpio' + PINS[1]),
    path.join(DIR, 'gpio' + PINS[2]),
    path.join(DIR, 'gpio' + PINS[3])];

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/simple', function (req, res) {
    res.sendfile('index_simple.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});


var initialize_pin = function (i) {
    try {
        fs.writeFileSync(path.join(DIR, 'export'), PINS[i]);
        fs.writeFileSync(path.join(GPIOS[i], 'direction'), 'out');
	fs.writeFileSync(path.join(GPIOS[i], 'value'), 0);
    }catch (e){
        console.log(e);
    }
};

var finalize_pin = function (i) {
    fs.writeFileSync(path.join(DIR, 'unexport'), PINS[i]);
};

var activate_motor = function (index, start, duration) {
    setTimeout(function () {
        fs.writeFileSync(path.join(GPIOS[index], 'value'), 1);
        console.log("On: " + GPIOS[index]);
        setTimeout(function () {
            fs.writeFileSync(path.join(GPIOS[index], 'value'), 0);
            console.log("Off: " + GPIOS[index]);
        }, duration);
    }, start);

};

var test_motors = function() {
    activate_motor(0, 0, 1000);
    activate_motor(1, 500, 500);
    activate_motor(2, 1000, 500);
    activate_motor(3, 1500, 500);
};

initialize_pin(0);
initialize_pin(1);
initialize_pin(2);
initialize_pin(3);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('command', function (data) {
        console.log("Input:", data);
        for(var i=0; i<data.length; i++) {
            activate_motor(data[i][0],data[i][1],data[i][2])
        }
    });

});

