const io = require("socket.io-client");
var socket;

export function sendMsg(message) {
    if (socket != null) {
        socket.emit("msg", JSON.stringify(message));
        return
    } else {
        console.log("socket not initialized");
    }

}

export function socketInit() {
    console.log('connecting');
    socket = io("http://localhost:8093", {
        query: {
            channel: 2
        }
    });

    return socket;

}