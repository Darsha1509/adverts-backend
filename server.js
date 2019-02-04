'use strict';

const express = require('express');
const config = require('getconfig');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const adverts = require('./routes/adverts');

const handlerErr = require('./middlewares/handlerError');

app.use(users);
app.use(adverts);

mongoose.connect(config.mongoDB, { useNewUrlParser: true }, () => {
  console.log('db connected');
  app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
  });
});

app.use(handlerErr.handlerErr);
