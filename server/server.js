const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '..' , 'public');
const port  = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the app chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user jonied'));

  socket.on('join',(params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are require.');
    }

    callback();
  });

  socket.on('createMessage', (message, callback)=>{
      console.log('createMessage', message);
      io.emit('newMessage',generateMessage(message.from, message.text));
      // socket.broadcast.emit('newMessage',{
      //   form : message.from,
      //   text : message.text,
      //   createAt : new Date().getTime()
      // });
      callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });

  socket.on('createEmail', (newEmail) =>{
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect',() => {
      console.log('User was disconnected');
  });
});

server.listen(port,function() {
  console.log(`Server is up on port ${port}` );
});
