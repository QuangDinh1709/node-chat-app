const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '..' , 'public');
const port  = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from : 'mike@example.com',
  //   text : 'Hello. What is going on',
  //   createAt : 123
  // });

  // socket.emit('newMessage', {
  //   from : 'John',
  //   text : 'See you then',
  //   createAt : 123123
  // });

  socket.emit('newMessage', generateMessage('Admin','Welcome to the app chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user jonied'));

  socket.on('createMessage', (message)=>{
      console.log('createMessage', message);
      io.emit('newMessage',generateMessage(message.from, message.text));
      // socket.broadcast.emit('newMessage',{
      //   form : message.from,
      //   text : message.text,
      //   createAt : new Date().getTime()
      // });
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
