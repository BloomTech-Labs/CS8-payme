// const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const server = express();

const port = process.env.PORT || 5000;

server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ message: 'API running successfully! YAY!' });
});

server.use('/api/register', require('./controllers/users/registerUser'));

mongoose
  .connect(process.env.DATA_BASE || 'mongodb://localhost/givememymoney')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log('Error connecting to DB', err);
  });


// For heroku Build
server.use(express.static(path.join(__dirname, "../client/build")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
  // res.sendFile(path.join(`${__dirname  }/hairspray-app/build/index.html`));

});

server.listen(port, err => {
  console.log(`connected to the server port ${port}`);
});
