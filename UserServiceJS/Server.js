const express = require('express')
const app = express()
const port = 8097
const hostname = '127.0.0.1';
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Kafka } = require('kafkajs')
var amqp = require('amqplib/callback_api');
const { connect } = require('http2');



const url = 'mongodb://localhost:2717';
const dbName = 'test';
const Mongoclient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const kafka = new Kafka({
    clientId: 'UserServiceJS',
    brokers: ['172.29.193.168:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function init() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'userstreams', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            //console.log(JSON.parse(message.value.toString()));
            handleKafkaMsg(JSON.parse(message.value.toString()))
        },
    })

    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'hello';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function (msg) {
                console.log(" [x] Received %s", msg.content.toString());
                console.log(" [x] Received %s", msg.fields.routingKey.toString());
                if (msg.fields.routingKey === 'KK.EVENT.ADMIN.Twitch2.SUCCESS.USER.CREATE') {
                    console.log("hoi");
                }
                if (msg.fields.routingKey === 'KK.EVENT.CLIENT.Twitch2.SUCCESS.Twitch2Frontend.REFRESH_TOKEN') {
                    console.log("doei");
                }
            }, {
                noAck: true
            });


        });
    });

    Mongoclient.connect(async function (err) {
        try {
            assert.strictEqual(null, err);
            console.log('Connected successfully to server');

            // const db = Mongoclient.db(dbName);
            // const users = db.collection("users");


            // const query = { streaming: true };
            // const options = {
            //     // sort matched documents in descending order by rating
            //     sort: { name: -1 },
            //     // Include only the `title` and `imdb` fields in the returned document
            //     projection: { _id: 0, name: 1 },
            // };
            // const user = await users.findOne(query, options);
            // console.log(user);




            //client.close();
        } finally {
            //await Mongoclient.close();
        }


    });


}
init()

async function mongoInsert(data) {
    try {
        const doc = { name: data.name, streaming: data.streaming };
        const result = await users.insertOne(doc);
    } catch (e) { console.log(e); }
    finally { }
}

async function mongoUpdate(data) {

    const db = Mongoclient.db(dbName);
    const users = db.collection("users");
    try {
        

        const filter = { name: data.name };

        const options = { upsert: true };

        const updateDoc = {
            $set: {
                streaming:
                    data.streaming,
            },
        };
        const result = await users.updateOne(filter, updateDoc, options);
    } catch (e) { console.log(e); }
    finally {
        const query = { name: data.name };
        const options = {
            // sort matched documents in descending order by rating
            sort: { name: -1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0, name: 1, streaming: 1 },
        };
        const user = await users.findOne(query, options);
        console.log("user:");
        console.log(user);
    }

}




function handleKafkaMsg(msg) {
    console.log(`msg: ${msg.user} ${msg.status}`);
    mongoUpdate({ name: msg.user, streaming: msg.status })
}



app.options('*', cors())
app.use(cors)
app.use(express.json)


app.get('/streams', (req, res) => {
    res.send('streams')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/StartUserStream', function (req, res) {
    console.log(res.req.body);
    //unieke gebruikersnaam = streamkey

    //Mongodb set user streaming boolean = true
    return 200;
})

app.get('/GetStreamers', (req, res) => {
    //Get mongo users where streaming = true
    res.send('Hello World!')
})