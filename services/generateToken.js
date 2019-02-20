const jwt = require('jsonwebtoken');
const config = require('getconfig');

const generateToken = async function generateToken(userId) {
  const token = jwt.sign({ id: userId }, config.secret);
  return token;
};

module.exports = generateToken;
