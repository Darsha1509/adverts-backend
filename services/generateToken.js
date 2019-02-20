const jwt = require('jsonwebtoken');
const config = require('getconfig');

const generateToken = async function generateToken(payload) {
  const token = await jwt.sign(payload, config.secret);
  return token;
};

module.exports = generateToken;