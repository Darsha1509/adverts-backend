const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('every time log');
  next();
});

module.exports = {
  app,
};
