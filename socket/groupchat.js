module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('join', (params, callback) => {
      socket.join(params.room);
      callback();
    });
    socket.on('createMessage', (message, callback) => {
      console.log(message);

      // emite a la sala solamente
      io.to(message.room).emit('newMessage', {
        text: message.text,
        room: message.room,
        from: message.sender
      });

      // emite a todos
      //   io.emit('newMessage', {
      //     text: message.text,
      //     room: message.room
      //   });
      callback();
    });
  });
}