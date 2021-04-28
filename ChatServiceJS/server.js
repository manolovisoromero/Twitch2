const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var forEach = require('foreach');


var channels = [];

const Redis = require("ioredis");
var publisher = new Redis(8091); // uses defaults unless given configuration object
var subscriber = new Redis(8091);

io.on("connection", (socket) => {
    console.log(socket.id)
    const channel = `channel${socket.handshake.query.channel}`;
    redisSub(channel, socket);

    socket.on("msg", (arg) => {
        var msg = JSON.parse(arg);
        redisProd(channel, msg.msg)
    })
});


function addPersonAndChannel(channelToAddTo, user){
    var channelfound = false;
    channels.forEach(channel => {
        if(channel.channel == channelToAddTo){
            channel.users.push(user);
            channelfound = true;
        } 
    })
    if(!channelfound){
        var channel = { channelnr: channelToAddTo, users: [user]}
        channels.push(channel);
    }
    
};


function removeChannel(){


}


function removePerson(){


}
io.listen(8092);

function redisProd(channel, msg) {
    publisher.publish(channel, JSON.stringify(msg));

    console.log(`produced to ${channel}`)
}

function redisSub(channel, socket) {
    subscriber.subscribe(channel, (err) => {
        if (err) {
            console.error(err.message)
        } else {
            console.log(`subbed to ${channel}`)
        }
    })
    subscriber.on("message", (channel,message) => {
        console.log(`Received ${message} from ${channel}`);
        socket.emit("msg", message);
    })

}




