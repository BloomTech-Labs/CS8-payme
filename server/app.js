const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/');
const keys = require('./config/keys');
const port = process.env.PORT || 5000;
const app = express();

// Connecting to mLab/port
mongoose
  .connect(process.env.DATA_BASE || keys.mongoURI,  { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Error connecting to DB', err));

  app.listen(port, () => {
    console.log(`connected to the server port ${port}`);
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
routes(app)

// For Heroku Build
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
  // res.sendFile(path.join(`${__dirname  }/hairspray-app/build/index.html`));

});





