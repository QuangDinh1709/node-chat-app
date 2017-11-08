var socket = io();
socket.on('connect', function ()  {
  console.log('Connect to server');

  // socket.emit('createEmail',{
  //   to : 'jen@hello.com',
  //   text : 'Hey . This is Andrew.'
  // });

  // socket.emit('createMessage',{
  //   from : 'ABC',
  //   text : 'Yup, that works for me'
  // });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email',email);
// });

socket.on('newMessage',function(message) {

  var formattedTime = moment(message.createAt).format('h:mm a');

  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#message').append(li);
});

// socket.emit('createMessage', {
//   from : 'Frank',
//   text : 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

socket.on('newLocationMessage', function(message) {

  var formattedTime = moment(message.createAt).format('h:mm a');

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#message').append(li);

});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from : 'User',
    text : messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
      });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');;
    alert('Unable to fetch location.')
  });
});
