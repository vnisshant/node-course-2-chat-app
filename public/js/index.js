var socket=io();
function scrollToBottom(){
  //Selectors
  var messages=jQuery('#messages');
  var newMessage=messages.children('li:last-child');

  //Heights
  var clientHeight=messages.prop('clientHeight');
  var scrollTop=messages.prop('scrollTop');
  var scrollHeight=messages.prop('scrollHeight');
  var newMessageHeight=newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
};

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
  var formattedTime=moment(message.createdAt).format('h:mm A');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // console.log('newMessage',message);

  // var li=jQuery('<li></li>');
  // li.text(`${message.from}  ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
});
// socket.emit('createMessage',{
//   from:'Frank',
//   text:'HIIIIII'
// },function(data){
//   console.log('Got it',data);
// });
socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm A');
var template=jQuery('#location-message-template').html();
var html=Mustache.render(template,{
  from:message.from,
  url:message.url,
  createdAt:formattedTime
});
jQuery('#messages').append(html);
  // var li=jQuery('<li></li>');
  // var a=jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from}  ${formattedTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

});
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox=jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){
jQuery('[name=message]').val('')
  });
});
var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation)
  {return alert('Geolocation not supported by your browser');}
locationButton.attr('disabled','disabled').text('sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
