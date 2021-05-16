const express = require('express')
const app = express()
const port = 8097
const hostname = '127.0.0.1';
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:2717';
const dbName = 'test';
const client = new MongoClient(url);

// client.connect(function (err) {
//     assert.strictEqual(null, err);
//     console.log('Connected successfully to server');

//     const db = client.db(dbName);

//     client.close();
// });


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