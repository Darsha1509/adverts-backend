const Boom = require('boom');
const User = require('../models/user');

// залогиниться
exports.login = function login(req, res, next) {
  res.send('NOT IMPLEMENTED: Login process');
};

// создать пользователя
exports.createUser = function createUser(req, res, next) {
  res.send('NOT IMPLEMENTED: Create user');
};

// показать список всех пользователей
exports.getUsers = async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};

// показать пользователя
exports.getUser = async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.json({ user });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};

// обновить пользователя
exports.updateUser = async function updateUser(req, res, next) {
  res.send('NOT IMPLEMENTED: Update user');
};

// удалить пользователя
exports.deleteUser = async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.deleteOne({ _id: userId });
    return res.json({ user });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};
