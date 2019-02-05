const Boom = require('boom');
const User = require('../models/user');

exports.login = function login(req, res, next) {
  res.send('NOT IMPLEMENTED: Login process');
};

exports.createUser = async function createUser(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

exports.getUsers = async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    if (!users) {
      return next(Boom.notFound());
    }
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
};

exports.getUser = async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate({
      path: 'adverts',
      select: ['title', 'description'],
    });

    if (!user) {
      return next(Boom.notFound());
    }

    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

exports.updateUser = async function updateUser(req, res, next) {
  try {
    const query = { _id: req.params.id };
    const user = User.find(query);
    if (!user) {
      return next(Boom.notFound());
    }
    await User.findOneAndUpdate(query, { $set: req.body });
    const updatedUser = await User.findById(req.params.id);
    return res.json({ updatedUser });
  } catch (e) {
    return next(e);
  }
};

exports.deleteUser = async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.find({ _id: userId });
    if (!user) {
      return next(Boom.notFound());
    }
    await User.findOneAndRemove({ _id: userId });
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};
