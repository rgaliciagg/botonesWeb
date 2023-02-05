const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { SerialPort } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const baud = 9600; // Raspberry Pi Pico -> 115200 || Arduino Uno -> 9600 

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: baud }, function (err) {
    if (err) {
        return console.log('Error: ', err.message)
    }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(_path.join(__dirname + '/public/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('dato', (msg) => {
        console.log(msg);
        port.write(msg + '\n', (err) => {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
        })
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
