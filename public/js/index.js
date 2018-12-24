var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');

  // socket.emit('createEmail',{
  //   to:"jen@example.com",
  //   text:"Hey man"
  // });
  // socket.emit('createMessage',{
  //   from:'Andrew',
  //   text:'Yup,that works for me'
  // });
});

socket.on('disconnect',function(){
  console.log('Disconnected from server');
});
// socket.on('newEmail',function(email){
//   console.log('New Email',email);
// });

socket.on('newMessage',function(message){
  console.log('newMessage',message);
});
