const config = require('getconfig');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function findUserByToken(token) {
  const userId = jwt.verify(token, config.secret, (err, decoded) => {
    return decoded.id;
  });

  const user = await User.findById(userId);

  return user;
}

const authentication = async (req, res, next) => {
  if (!req.headers.authentication) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;

    return next(error);
  }

  const user = await findUserByToken(req.headers.authentication);

  if (!user) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;

    return next(error);
  }

  req.user = user;

  return next();
};

module.exports = authentication;
