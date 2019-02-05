'use strict';

const express = require('express');
const config = require('getconfig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const adverts = require('./routes/adverts');
const handlerErr = require('./middlewares/handlerError');

const app = express();

app.use(bodyParser.json());
app.use(users);
app.use(adverts);
app.use(handlerErr.handlerErr);

mongoose.connect(config.mongoDB, { useNewUrlParser: true }, () => {
  app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
  });
});
