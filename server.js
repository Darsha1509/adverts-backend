'use strict';

const express = require('express');
const config = require('getconfig');

const app = express();
const users = require('./routes/users');
const adverts = require('./routes/adverts');

app.use(users);
app.use(adverts);
app.listen(config.port);
