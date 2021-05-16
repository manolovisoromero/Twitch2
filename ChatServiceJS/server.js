const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
var forEach = require('foreach');


const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

var channels = [];

const Redis = require("ioredis");
var publisher = new Redis(8092); // uses defaults unless given configuration object
var subscriber = new Redis(8092);

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)
    const channel = `channel${socket.handshake.query.channel}`;
    addPersonAndChannel(channel, socket);

    socket.on("msg", (arg) => {
        var msg = JSON.parse(arg);
        redisProd(channel, msg.msg)
    })
    socket.on("disconnect", () => {
        removeDisconnected(socket)
    });
});



function addPersonAndChannel(channelToAddTo, user) {
    var channelfound = false;
    var i = 0;
    while (i < channels.length && channelfound == false) {
        if (channels[i].channelnr == channelToAddTo) {
            channels[i].users.push(user);
            channelfound = true;
        }
        i++
    }
    if (channelfound) { return; }
    if (!channelfound) {
        var channel = { channelnr: channelToAddTo, users: [user] }
        channels.push(channel);
        redisSub(channelToAddTo);

    }
};

function removeDisconnected(userToRemove) {
    console.log(new Date());
    var i = 0;
    var j = 0;
    var userfound = false;
    while (i < channels.length && !userfound) {
        while (j < channels[i].users.length) {
            if (channels[i].users[j].id == userToRemove.id) {
                channels[i].users.splice(j, 1)
                if (channels[i].users.length == 0) {
                    channels.splice(i, 1)
                }
                userfound = true
                break
            }
            j++
        }
        i++
    }
    console.log(new Date());
}


io.listen(8093);

function redisProd(channel, msg) {
    publisher.publish(channel, JSON.stringify(msg));

    //console.log(`produced to ${channel}`)
}

function redisSub(channel) {
    subscriber.subscribe(channel, (err) => {
        if (err) {
            console.error(err.message)
        } else {
            //console.log(`subbed to ${channel}`)
        }
    })

}

subscriber.on("message", (channel, message) => {
    //console.log(`Received ${message} from ${channel}`);

    var channelfound = false;
    var i = 0;
    while (i < channels.length && channelfound == false) {
        if (channels[i].channelnr == channel) {
            channels[i].users.forEach(user => {
                user.emit("msg", message)
            })
            channelfound = true;
        }
        i++
    }
})




