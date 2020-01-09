import express from 'express';
import bodyParser from 'body-parser';
import { initDb } from '../db/database.connection.js';
const app = express()
const server = require('http').createServer(app);

// Start Db
initDb()


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const path = require('path');
const port = process.env.PORT || 4000;

//Static file declaration

require('./api').default(app)

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Welcome !'});
})

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  //
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  })
}
//build mode
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})




server.listen(port)
console.log('app running on port ', port);