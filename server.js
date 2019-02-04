'use strict';

const express = require('express');
const config = require('getconfig');
const mongoose = require('mongoose');

const User = require('./models/user');
const Advert = require('./models/advert');

const app = express();
const users = require('./routes/users');
const adverts = require('./routes/adverts');

mongoose.connect(config.mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectionDB error:'));

app.use(users);
app.use(adverts);
app.listen(config.port);
