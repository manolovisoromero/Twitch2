const Redis = require("ioredis");

const redis = new Redis(8091); // uses defaults unless given configuration object

const channel1 = 'channel1';
const channel2 = 'channel2';


setInterval(() => {
    const message = { user: "hackerman",foo: "hoi" };
    // Publish to my-channel-1 or my-channel-2 randomly.
    const channel = `channel${1 + Math.round(Math.random())}`;
  
    // Message can be either a string or a buffer
    redis.publish(channel, JSON.stringify(message));
    console.log("Published %s to %s", message, channel);
  }, 1000);