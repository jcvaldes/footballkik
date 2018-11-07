$(document).ready(function() {
  var socket = io('http://localhost:3000');
  var room = $('#groupName').val();
  var sender = $('#sender').val();

  socket.on('connect', function() {
    console.log('yeaa!! User Connected');
    var params = {
      room: room
    }
    socket.emit('join', params, function() {
      console.log('User has joined this channel');
    });
  });
  socket.on('newMessage', function(data) {
    console.log(data);
    var template = $('#message-template').html();
    var message = Mustache.render(template, {
      text: data.text,
      sender: data.from
    });
    $('#messages').append(message);
  });

  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    var msg = $('#msg').val();
    socket.emit('createMessage', {
      text: msg,
      room: room,
      sender: sender
    }, function() {
      $('#msg').val('');
    });
  });
});