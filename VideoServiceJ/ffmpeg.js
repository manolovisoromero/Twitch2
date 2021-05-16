const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);


// module.exports = {

//       startStream: function(fileName){

//     const dirName = 'Files/' + fileName;

//     ffmpeg(`${dirName}`, {timeout: 432000}).addOptions([
//         '-profile:v baseline',
//         '-vcodec libx264',
//         '-g 30',
//         '-acodec aac',
//         '-strict -2',
//         '-f flv'
//     ]).output(`rtmp://localhost/show/${fileName}`).on('end', () => {
//         console.log('end');
//     }).run();
    

// }}


// ffmpeg(`videos/teasip.mp4`, {timeout: 432000}).addOptions([
//     '-profile:v baseline',
//     '-vcodec libx264',
//     '-g 30',
//     '-acodec aac',
//     '-strict -2',
//     '-f flv'
// ]).output(`rtmp://localhost/show/teasip`).on('end', () => {
//     console.log('end');
// }).run();
