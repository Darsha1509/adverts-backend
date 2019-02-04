const Boom = require('boom');

const handlerErr = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    res.json({ err });
  } else {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
};

module.exports = {
  handlerErr,
};
