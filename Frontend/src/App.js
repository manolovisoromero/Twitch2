import React, { Component } from 'react';
import './App.css';
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer.js'
import 'video.js/dist/video-js.css';
import Login from './Screens/Login.js'



const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://localhost:8081/hls/teasip.m3u8',
    type: 'application/x-mpegURL'
  }]
}

export default class App extends Component {




  constructor(props) {
    super(props);


    // subscribeToMessages((err, msg) => this.setState({
    //   msg
    // }));

  }
  state = {
    msg: 'No msg yet',
    isLoggedin: false,

  };


  onLoginClicked = () => { this.setState({ isLoggedin: !this.state.isLoggedin }); 
  }


  render() {
    var { isLoggedin } = this.state;

    if (!isLoggedin) {
      return <div className="loginHolder">
        <Login onLoginClicked={this.onLoginClicked} /*setData={this.setData}*/></Login>
      </div>
    }
    else {
      return (
         <VideoPlayer { ...videoJsOptions } />
        )
    }
    ;
  }
}


