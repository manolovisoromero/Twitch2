const io = require("socket.io-client");



const socket = io("http://localhost:8092", {
    query: {
        channel: 2
    }
});

const msg = { chnnl: 'channel2', msg: { user: "user", content: "content" } };

setTimeout(function () {
    socket.emit("msg", JSON.stringify(msg));
}, 3000);
setTimeout(function () {
    socket.emit("msg", JSON.stringify(msg));
}, 4000);


socket.on("msg", (arg) => {
    console.log(JSON.parse(arg)); // world
});
