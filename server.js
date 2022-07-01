const mongoose = require('mongoose');
const Msg = require('./model/chatschema');

const io = require('socket.io')(3000,{cors:{
    origin:['http://127.0.0.1:5500']
}}) // here I have setup cors because they both are hosting on diff server so we use cors 
require('./db');



io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');

    // socket.emit('message', 'Hello world');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chatmessage', msg => {
        const message = new Msg({ msg });
        message.save().then(() => {
            io.emit('message', msg)
        })

    })
});

