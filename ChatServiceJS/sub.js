const Redis = require("ioredis");

const redis = new Redis(8091); // uses defaults unless given configuration object

const channel1 = 'channel1';
const channel2 = 'channel2';

redis.subscribe(channel1, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log(`subbed to ${channel1}`)
    }
})


redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
})

