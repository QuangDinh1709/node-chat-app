var socket = io();
socket.on('connect', function ()  {
  console.log('Connect to server');

  // socket.emit('createEmail',{
  //   to : 'jen@hello.com',
  //   text : 'Hey . This is Andrew.'
  // });

  socket.emit('createMessage',{
    from : 'ABC',
    text : 'Yup, that works for me'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email',email);
// });

socket.on('newMessage',function(message) {
  console.log('newMessage',message);
});
