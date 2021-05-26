const express = require('express')
const app = express()
const { Kafka } = require('kafkajs')
const fileUpload = require('express-fileupload');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 8095
const port2 = 8081

app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.options('*', cors())


const kafka = new Kafka({
  clientId: 'VideoServiceJS',
  brokers: ['172.29.193.168:9092']
})
const producer = kafka.producer()


async function init(){
  await producer.connect()
}
init()

const { startStream } = require('./ffmpeg');
const { query } = require('express');

app.post('/upload', function (req, res) {

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath = __dirname + '/Files/' + sampleFile.name;
  //console.log(`encoding: ${sampleFile.encoding}`);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
    const response = { Msg: 'File uploaded!', filename:sampleFile.name}
    res.send(response);
  });
});

app.post('/startStream', function (req, res) {
  console.log(res.req.body);

  // startStream(req.body.filename, function (err){
  //   if(err){
  //     return res.status(500).send(err);
  //   }
  //   res.send('stream started')
  // })
})


function addLiveStream(streamId){
  //Add the started livestream to list of available streams
}

function removeLiveStream(streamId){
  //Remove the stopped livestream to list of available streams.
}

app.get('/', (req, res) => {
  console.log(res.req.query);
  const nr = Math.random();


  return res.status(200).send(nr.toString());
})


app.get('/UserStream', (req, res) => {
  console.log(res.req.query);

  const nr = Math.random();
  var status = false;
  if(res.req.query.call == 'done'){status = false};
  if(res.req.query.call == 'publish'){status = true};
  sendKafkaMsg({ user: res.req.query.name, status: status })
  return res.status(200).send(nr.toString());
})

async function sendKafkaMsg(message){
  console.log(message);
  await producer.send({
    topic: 'userstreams',
    messages: [
      { value: JSON.stringify(message)},
    ],
  }) 
}


app.listen(port2, () => {
  console.log(`Example app listening at http://localhost:${port2}`)
})



app.post('/PostVideo', (req, res) => {
  return res.send('Received a POST HTTP method');
});

