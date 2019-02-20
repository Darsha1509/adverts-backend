const Boom = require('boom');
const User = require('../models/user');

const authentication = async (req, res, next) => {
  if (!req.headers.authentication) {
    const error = new Error('Unauthorized');
    Boom.boomify(error, { statusCode: 401 });

    return next(error);
  }

  const user = await User.findUserByToken(req.headers.authentication);
  if (!user) {
    const error = new Error('Unauthorized');
    Boom.boomify(error, { statusCode: 401 });

    return next(error);
  }

  req.user = user;

  return next();
};

module.exports = authentication;
