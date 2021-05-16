const express = require('express')
const app = express()
const port = 8095
const port2 = 8081

const hostname = '127.0.0.1';
const fileUpload = require('express-fileupload');

const cors = require('cors');


app.use(cors())
app.use(express.json());
app.use(fileUpload());

const { startStream } = require('./ffmpeg')



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
  console.log(res.req.body);
  const nr = Math.random();
  return res.status(200).send(nr.toString());
})
app.get('/test', (req, res) => {
  console.log(res.req.body);
  res.sendStatus(200).send('hi');
})

app.get('/test3', (req, res) => {
  console.log(res.req.body);
  res.sendStatus(200);
})
app.get('/test5', (req, res) => {
  console.log(res.req.body);
  res.sendStatus(200);
})




app.listen(port2, () => {
  console.log(`Example app listening at http://localhost:${port2}`)
})

app.options('*', cors())


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


app.post('/PostVideo', (req, res) => {
  return res.send('Received a POST HTTP method');
});

