import express from 'express';
import bodyParser from 'body-parser';
import { initDb } from '../db/database.connection.js';
const app = express()
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const connections = []
const users = []
// Start Db
initDb()


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.sockets = io;
  
  next();
});
require('./api').default(app)

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Welcome !'});
})


server.listen(4000)
console.log('app running on port ', 4000);

// Socket

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  
  console.log(`${connections.length} connected`);

  
  
  socket.on('add_user', (data) => {
    users.push(data);
    socket.user = data;
    app.use((req, res, next) => {
      req.user = data;
      
      next();
    });
    io.sockets.emit('all_users', users);
    console.log(users)
  });

  socket.on('which_user', data => {
    io.sockets.emit('this_user', socket.user);
  })


  socket.on('disconnect', (data) => {
    const index = connections.indexOf(socket);
    const userIndex = users.indexOf(socket.user);

    connections.splice(index,1);
    users.splice(userIndex, 1);
    console.log(`${connections.length} Disconnected`);
    io.sockets.emit('all_users', users);
    console.log(users)

  });
})