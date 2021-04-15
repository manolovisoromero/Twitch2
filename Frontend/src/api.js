import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000', {
    extraHeaders: {
        "my-custom-header": "abcd"
      }
});

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

  function sendSocketMessage(msg){
      console.log("sent");
      socket.emit('chat message', msg);
  }


function subscribeToMessages(cb){
    socket.on('message', msg => cb(null,msg));
    socket.emit('subscribeToMessages');
}
  export { subscribeToTimer, sendSocketMessage, subscribeToMessages };