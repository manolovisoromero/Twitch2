const io = require("socket.io-client");



const socket = io("http://localhost:8092", {
    query: {
        channel: 1
    }
});

const msg = { chnnl: 'channel1', msg: { user: "user", content: "content"}};

setTimeout(function(){
    socket.emit("msg", JSON.stringify(msg));
    }, 3000);


socket.on("msg", (arg) => {
    console.log(JSON.parse(arg)); // world
  });
