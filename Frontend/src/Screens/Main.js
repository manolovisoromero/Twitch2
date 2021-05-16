import React, { useState, useRef, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import VideoPlayer from '../VideoPlayer.js';
import './Main.css';
import TextField from '@material-ui/core/TextField'
import { sendMsg, socketInit } from '../SocketComm'
import axios from 'axios';


import Stream from '../Components/Stream'

const io = require("socket.io-client");

const socketAddress = "http://localhost:8093"

const socket = io(socketAddress, {
    query: {
        channel: 'channel2'
    }
});



export default function App() {

    const [messages, setMessages] = useState([{ user: 'System', msg: 'Welcome!' }]);
    const [textfieldInput, setTextfieldInput] = useState('');
    const [channelInput, setChannelInput] = useState('test');

    const [fileUpload, setFile] = useState(null);

    const scrollRef = useRef(null);





    const testStreamer = { name: 'Manolo' }
    const [streamer, setStreamer] = useState(testStreamer);

    useEffect(() => {
        if (scrollRef.current) {
            const element = scrollRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }
    });

    useEffect(() => {
        socket.on("msg", (arg) => {
            const msg = JSON.parse(arg)
            onWsMessage(msg.user, msg.content)
        });
    }, [])


    function addMessage(user, message) {

        if (messages.length >= 20) {
            removeLastItem();
        }
        console.log(messages);
        console.log(`length ${messages.length}`);
        setMessages(arr => [...arr, { user: user, msg: message }]);
        console.log(messages);
        console.log(`length ${messages.length}`);

        setTextfieldInput('')
    }

    function removeLastItem() {
        console.log('remove');
        var array = messages;
        array.shift();
        setMessages(array)
    }



    function onWsMessage(user, message) {
        //setMessages(arr => [...arr, { user: user, msg: message }]);
        addMessage(user, message)
    }

    function sendWsMessage(e) {
        var msg = { chnnl: channelInput, msg: { user: "user", content: "content" } };
        if (e.key == 'Enter' && textfieldInput != '') {
            const user = 'test'
            msg.msg.user = user
            msg.msg.content = textfieldInput
            //sendMsg(msg)
            socket.emit("msg", JSON.stringify(msg));
        }
    }

    function changeChannel(e) {
        // if (e.key == 'Enter' && textfieldInput != '') {
        //     connectSocket()
        // }
    }

    function onTempMessage(e) {
        if (e.key == 'Enter' && textfieldInput != '') {
            const user = 'test'
            addMessage(user, textfieldInput)
        }

    }

    function onChangeHandler(event) {

        console.log(event.target.files[0])
        setFile(event.target.files[0])

    }

    function sendFile() {

        const data = new FormData()
        data.append('file', fileUpload)


        axios.post("http://localhost:8095/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.filename)
                const response = { filename:res.data.filename}

                axios.post("http://localhost:8095/startStream", response)
            })
    }

    return (
        <Router >
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/stream">Stream</Link>
                    </li>
                    <li>
                        <Link to="/streamer">Streamer</Link>
                    </li>
                </ul>
            </nav>

            <div className='content'>
                <Switch>
                    <Route path="/stream">
                        <div className="streamer-info">
                            <text>{streamer.name}</text>
                            <div className="chat-input">
                                <TextField value={channelInput} onChange={(e) => setChannelInput(e.target.value)} onKeyDown={e => changeChannel(e)} ></TextField>
                            </div>
                        </div>
                        <div className="stream-holder">
                            <div className="video-holder">
                                <VideoPlayer />

                            </div>
                            <div className="chat">
                                <div className="chat-messages" ref={scrollRef}>
                                    {messages.map((message, i) => {
                                        return (<div className="message">{message.user}:  { message.msg} {messages.length}</div>)
                                    })}
                                </div>
                                <div className="chat-input">
                                    <TextField value={textfieldInput} onChange={(e) => setTextfieldInput(e.target.value)} onKeyDown={e => sendWsMessage(e)}></TextField>
                                </div>
                            </div>
                        </div>
                    </Route>
                    <Route path="/streamer">
                        <Stream></Stream>
                    </Route>
                    <Route path="/streamer">
                        <Stream/>
                    </Route>
                    <Route path="/">
                        <div>Hoi</div>
                        <input type="file" name="file" onChange={(event) => onChangeHandler(event)} />
                        <button onClick={() => sendFile()}>Upload video</button>

                    </Route>

                </Switch></div>

        </Router>

    );
}