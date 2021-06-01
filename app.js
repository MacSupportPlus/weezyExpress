const express = require('express');
const app = express();
const socket = require('socket.io');
let port = 3000;
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.use(require('./routes/index.js'));












let server = app.listen(3000, () => {
    console.log(`listening on port ${port}`);
})

let io = socket(server);

io.on('connection', (socket) => {

    console.log('client connected');
    socket.on('postMessages', msgObject => {
        console.log('message received', msgObject);
        io.emit('updateMessage', msgObject);
    })


})