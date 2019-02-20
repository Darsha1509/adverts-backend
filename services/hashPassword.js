const config = require('getconfig');
const util = require('util');
const crypto = require('crypto');

const hashPassword = async function hashPassword(password) {
  const derivedKey = await util.promisify(crypto.pbkdf2)(
    password,
    config.salt,
    100000,
    512,
    'sha512'
  );
  return derivedKey.toString('hex');
};

module.exports = hashPassword;
