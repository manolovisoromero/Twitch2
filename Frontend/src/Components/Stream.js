import React, { useState, useRef, useEffect } from "react";
import '../Screens/Main.css';
import TextField from '@material-ui/core/TextField'
import VideoPlayer from '../VideoPlayer.js';
const io = require("socket.io-client");

const socketAddress = "http://localhost:8093"

const socket = io(socketAddress, {
    query: {
        channel: 'channel1'
    }
});

export default function Stream() {


    const [messages, setMessages] = useState([{ user: 'System', msg: 'Welcome!' }]);
    const [textfieldInput, setTextfieldInput] = useState('');
    const [channelInput, setChannelInput] = useState('test');

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

    return (

        <div className='content2' >

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
        </div>

    )



}
