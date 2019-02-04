'use strict';

const express = require('express');
const config = require('getconfig');
const mongoose = require('mongoose');

const User = require('./models/user');
const Advert = require('./models/advert');

const app = express();
const users = require('./routes/users');
const adverts = require('./routes/adverts');

app.use(users);
app.use(adverts);

mongoose.connect(config.mongoDB, { useNewUrlParser: true }, () => {
  console.log('db connected');
  app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
  });
});
