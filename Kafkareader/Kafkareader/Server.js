import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = require('express')();
const http = require('http').Server(app);
import {kafkaInit} from './KafkaConsumer.mjs';


const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"]
    }
});

io.on('connection', (client) => {
    client.on('subscribeToMessages', (interval) => {
         console.log('client is subscribing to messages.');
    });
});



kafkaInit(io);

const port = 8000;
io.listen(port);
console.log('listening on port ', port);