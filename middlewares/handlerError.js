const Boom = require('boom');

const handlerErr = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    res.status(err.output.statusCode).json({ err });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.errors });
  } else {
    console.error(err.stack);
    res.status(500).json({ statusCode: 500, error: err.message });
  }
};

module.exports = {
  handlerErr,
};
