import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer.js'
import 'video.js/dist/video-js.css';
import Login from './Screens/Login.js'
import Login2 from './Screens/Login2.js'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloak from './keycloak'
import Main from './Screens/Main.js'
import './Screens/Main.css';




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


  onLoginClicked = () => {
    this.setState({ isLoggedin: !this.state.isLoggedin });
  }


  render() {
    var { isLoggedin } = this.state;

    if (!isLoggedin) {
      return (
        <ReactKeycloakProvider authClient={keycloak}
        >
          <Login2 loginClick={this.onLoginClicked}></Login2>
        </ReactKeycloakProvider>
      )
    }
    else {
      return (
        <ReactKeycloakProvider authClient={keycloak}>
          {/* <VideoPlayer {...videoJsOptions} /> */}
          <div className="App-body">

          <Main/>

          </div>

        </ReactKeycloakProvider>
      )
    }
    ;
  }
}


